using AutoMapper;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetManagementGrpcService.Utilities.Configuration;
using Models = WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Repositories.Widget
{
    /* https://morioh.com/p/fe249dd19cc1 */
    public class WidgetRepository : IWidgetRepository
    {
        private readonly ILogger<WidgetRepository> _logger;
        private IMongoCollection<Models.Widget> _widgets;
        private readonly IMapper _mapper;

        public WidgetRepository(
            WidgetManagementMongoDbConfiguration config,
            IMapper mapper,
            ILogger<WidgetRepository> logger
            )
        {
            var client = new MongoClient(config.ConnectionString);
            var database = client.GetDatabase(config.DatabaseName);

            _widgets = database.GetCollection<Models.Widget>(config.WidgetsCollectionName);
            _mapper = mapper;
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


        public async Task<Dictionary<string, string>> ProcessMessage(string widgetId, string dashboardWidgetId, string currentUserId)
        {
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
                        return new Dictionary<string, string>
                        {
                            { "valid", "false" }
                        };
                    }

                default:
                    throw new ArgumentException($"Invalid {nameof(widgetId)}: {widgetId}");
            }
        }
    }
}
