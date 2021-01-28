using AutoMapper;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetManagementGrpcService.Repositories.Widget.WidgetLogic;
using WidgetManagementGrpcService.Utilities.Configuration;
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

        public WidgetRepository(
            WidgetManagementMongoDbConfiguration config,
            IMapper mapper,
            ILogger<WidgetRepository> logger,
            SubscriptionServicesClient subscriptionServicesClient
            )
        {
            var client = new MongoClient(config.ConnectionString);
            var database = client.GetDatabase(config.DatabaseName);

            _widgets = database.GetCollection<Models.Widget>(config.WidgetsCollectionName);
            _widgetUserExecutionTrackers = database.GetCollection<Models.WidgetUserExecutionTracker>(config.WidgetUserExecutionTrackersCollectionName);
            _mapper = mapper;
            _subscriptionServicesClient = subscriptionServicesClient;
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
                query = query.Where(x => x.Name.Contains(request.Text) || x.Description.Contains(request.Text));
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
                if(widgetTracker?.TotalExecutions >= 100) // TODO: (CJO) We need to make this free quota configurable
                {
                    throw new ArgumentException($"Free monthly quota exceeded.");
                }
            }

            switch (widgetId)
            {
                case WidgetManagementConstants.WidgetIds.TfnGeneratorWidgetId:
                    {
                        return new Dictionary<string, string>
                        {
                            { "tfn", "123" }
                        };
                    }

                case WidgetManagementConstants.WidgetIds.TfnValidatorWidgetId:
                    {
                        return await AustralianTFNValidator.Validate(payloads);
                    }

                default:
                    throw new ArgumentException($"Invalid {nameof(widgetId)}: {widgetId}");
            }
        }
    }
}
