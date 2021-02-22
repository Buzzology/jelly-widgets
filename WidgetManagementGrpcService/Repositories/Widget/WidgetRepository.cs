using AutoMapper;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetManagementGrpcService.EventHandling;
using WidgetManagementGrpcService.Repositories.Widget.WidgetLogic;
using WidgetManagementGrpcService.Repositories.WidgetUserExecutionTracker;
using WidgetManagementGrpcService.Utilities.Configuration;
using WidgetManagementIntegrationEvents.Widget;
using static SubscriptionManagementGrpcService.SubscriptionServices;
using Models = WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Repositories.Widget
{
    /* https://morioh.com/p/fe249dd19cc1 */
    public class WidgetRepository : IWidgetRepository
    {
        private ILogger<WidgetRepository> _logger { get; init; }
        private IMongoCollection<Models.Widget> _widgets { get; init; }
        private IMongoCollection<Models.WidgetUserExecutionTracker> _widgetUserExecutionTrackers { get; init; }
        private IMapper _mapper { get; init; }
        SubscriptionServicesClient _subscriptionServicesClient { get; init; }
        private IWidgetManagementIntegrationEventService _widgetManagementIntegrationEventService { get; init; }
        private IWidgetUserExecutionTrackerRepository _widgetUserExecutionTrackerRepository { get; set; }

        public WidgetRepository(
            WidgetManagementMongoDbConfiguration config,
            IMapper mapper,
            ILogger<WidgetRepository> logger,
            SubscriptionServicesClient subscriptionServicesClient,
            IWidgetManagementIntegrationEventService widgetManagementIntegrationEventService,
            IWidgetUserExecutionTrackerRepository widgetUserExecutionTrackerRepository
            )
        {
            var client = new MongoClient(config.ConnectionString);
            var database = client.GetDatabase(config.DatabaseName);

            _logger = logger;
            _widgets = database.GetCollection<Models.Widget>(config.WidgetsCollectionName);
            _widgetUserExecutionTrackers = database.GetCollection<Models.WidgetUserExecutionTracker>(config.WidgetUserExecutionTrackersCollectionName);
            _mapper = mapper;
            _subscriptionServicesClient = subscriptionServicesClient;
            _widgetManagementIntegrationEventService = widgetManagementIntegrationEventService;
            _widgetUserExecutionTrackerRepository = widgetUserExecutionTrackerRepository;
        }


        public async Task<Models.Widget> Get(string id, string currentUserId)
        {
            return _widgets
                .Find(widget => widget.WidgetId == id)
                .FirstOrDefault();
        }


        public async Task<Models.Widget> Create(Models.Widget widget, string currentUserId)
        {
            _widgets.InsertOne(widget);

            return widget;
        }


        public async Task<Models.Widget> Update(Models.Widget widgetIn, string currentUserId)
        {
            if (widgetIn == null) throw new ArgumentException("No values provided for widget update.");

            var widget = await Get(widgetIn?.WidgetId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Widget)} was not found: {widgetIn.WidgetId}");

            // Update any relevant widget properties
            widget.Name = widgetIn.Name;
            widget.Description = widgetIn.Description;

            _widgets.ReplaceOne(widget => widget.WidgetId == widgetIn.WidgetId, widgetIn);

            return await Get(widgetIn?.WidgetId, currentUserId);
        }


        public async Task Remove(string widgetId, string currentUserId)
        {
            _ = await Get(widgetId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Widget)} was not found: {widgetId}");
            _widgets.DeleteOne(membership => membership.WidgetId == widgetId);
        }


        public Task<List<Models.Widget>> Search(WidgetRepositorySearchProperties request)
        {
            var query = _widgets.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.WidgetId))
            {
                query = query.Where(x => x.WidgetId == request.WidgetId);
            }

            if (!string.IsNullOrWhiteSpace(request.Text))
            {
                query = query.Where(x => x.Name.ToLower().Contains(request.Text.ToLower()) || x.Description.ToLower().Contains(request.Text.ToLower()));
            }

            // Apply ordering
            // query = query.OrderByDescending(x => x.OrderNumber);

            // NOTE: May need to check this implementation, most examples seem to be using limit instead
            query = query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize);

            return query.ToListAsync();
        }


        public async Task<Dictionary<string, string>> ProcessMessage(string widgetId, string dashboardWidgetId, string currentUserId, Dictionary<string, string> payloads)
        {
            // Check if they have an active subscription
            var userHasActiveSubscription = (await _subscriptionServicesClient.SubscriptionGetHasActiveStatusAsync(
                new SubscriptionManagementGrpcService.SubscriptionGetHasActiveStatusRequest
                {
                    UserDetailId = currentUserId,
                })).Active;

            // If they don't have an active subscription we need to check they haven't exceeded the free tier
            if (!userHasActiveSubscription)
            {
                var widgetTracker = _widgetUserExecutionTrackers.Find(x => x.UserDetailId == currentUserId && x.Archived == false).FirstOrDefault();
                if(widgetTracker?.DailyExecutions >= 25) // TODO: (CJO) We need to make this free quota configurable
                {
                    // Reset the tracker if required otherwise error out
                    if (widgetTracker?.DailyExecutionsReset == null || widgetTracker?.DailyExecutionsReset <= DateTime.UtcNow)
                    {
                        widgetTracker.DailyExecutionsReset = DateTime.UtcNow.AddDays(1);
                        widgetTracker.DailyExecutions = 0;
                        widgetTracker = await _widgetUserExecutionTrackerRepository.Update(widgetTracker, widgetTracker.UserDetailId);
                    }
                    else
                    {
                        throw new ArgumentException($"Free tier resets in {widgetTracker.DailyExecutionsReset.Subtract(DateTime.UtcNow).Hours} hours.");
                    }
                }
            }

            Dictionary<string, string> resp;
            switch (widgetId)
            {
                case WidgetManagementConstants.WidgetIds.TfnGeneratorWidgetId:
                    {
                        resp = await AustralianTFNGenerator.Process(payloads);
                        break;
                    }

                case WidgetManagementConstants.WidgetIds.TfnValidatorWidgetId:
                    {
                        resp = await AustralianTFNValidator.Process(payloads);
                        break;
                    }

                case WidgetManagementConstants.WidgetIds.AustralianBusinessNumberGeneratorWidgetId:
                    {
                        resp = await AustralianBusinessNumberGenerator.Process(payloads);
                        break;
                    }

                case WidgetManagementConstants.WidgetIds.AustralianBusinessNumberValidatorWidgetId:
                    {
                        resp = await AustralianBusinessNumberValidator.Process(payloads);
                        break;
                    }

                case WidgetManagementConstants.WidgetIds.AustralianCompanyNumberGeneratorWidgetId:
                    {
                        resp = await AustralianCompanyNumberGenerator.Process(payloads);
                        break;
                    }

                case WidgetManagementConstants.WidgetIds.AustralianCompanyNumberValidatorWidgetId:
                    {
                        resp = await AustralianCompanyNumberValidator.Process(payloads);
                        break;
                    }

                default:
                    throw new ArgumentException($"Invalid {nameof(widgetId)}: {widgetId}");
            }

            var @event = new WidgetExecutedIntegrationEvent(currentUserId, widgetId);
            await _widgetManagementIntegrationEventService.SaveEventAndContentManagementContextChangesAsync(@event);
            await _widgetManagementIntegrationEventService.PublishThroughEventBusAsync(@event);

            return resp;
        }
    }
}
