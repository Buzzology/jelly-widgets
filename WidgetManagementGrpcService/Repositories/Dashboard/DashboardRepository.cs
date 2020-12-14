using AutoMapper;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WidgetManagementData.Models;
using WidgetManagementGrpcService.Utilities.Configuration;
using Models = WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Repositories.Dashboard
{
    /* https://morioh.com/p/fe249dd19cc1 */
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ILogger<DashboardRepository> _logger;
        private IMongoCollection<Models.Dashboard> _dashboards;
        private readonly IMapper _mapper;

        public DashboardRepository(
            WidgetManagementMongoDbConfiguration config,
            IMapper mapper,
            ILogger<DashboardRepository> logger
            )
        {
            var client = new MongoClient(config.ConnectionString);
            var database = client.GetDatabase(config.DatabaseName);

            _dashboards = database.GetCollection<Models.Dashboard>(config.DashboardsCollectionName);
            _mapper = mapper;
        }

        
        public Models.Dashboard Get(string id, string currentUserId)
        {
            return _dashboards
                .Find<Models.Dashboard>(dashboard => dashboard.DashboardId == id && dashboard.UserId == currentUserId)
                .FirstOrDefault();
        }


        public Models.Dashboard Create(Models.Dashboard dashboard, string currentUserId)
        {
            dashboard.UserId = currentUserId;
            _dashboards.InsertOne(dashboard);

            return dashboard;
        }


        public void Update(Models.Dashboard dashboardIn, string currentUserId)
        {
            if (dashboardIn == null) throw new ArgumentException("No values provided for dashboard update.");

            var dashboard = Get(dashboardIn?.DashboardId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardIn.DashboardId}");

            // Update any relevant dashboard properties
            dashboard.Name = dashboardIn.Name;
            dashboard.OrderNumber = dashboardIn.OrderNumber;

            _dashboards.ReplaceOne(dashboard => dashboard.DashboardId == dashboardIn.DashboardId, dashboardIn);
        }


        public void AddWidget(string dashboardId, string widgetId, int widgetOrderNumber, string currentUserId)
        {
            var dashboard = Get(dashboardId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardId}");
            dashboard.DashboardWidgets.Add(
                new DashboardWidget {
                OrderNumber = widgetOrderNumber,
                WidgetId = widgetId
            });

            _dashboards.ReplaceOne(dashboard => dashboard.DashboardId == dashboardId, dashboard);
        }


        public void RemoveWidget(string dashboardId, string widgetId, int widgetOrderNumber, string currentUserId)
        {
            var dashboard = Get(dashboardId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardId}");
            var indexToRemove = dashboard.DashboardWidgets.FindIndex(x => x.WidgetId == widgetId);

            if (indexToRemove < 0) throw new KeyNotFoundException($"Widget not found on dashboard: {nameof(widgetId)}: {widgetId} {nameof(dashboardId)} {dashboardId}");

            dashboard.DashboardWidgets.RemoveAt(indexToRemove);
            _dashboards.ReplaceOne(dashboard => dashboard.DashboardId == dashboardId, dashboard);
        }


        public void Remove(string dashboardId, string currentUserId)
        {
            _ = Get(dashboardId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardId}");
            _dashboards.DeleteOne(membership => membership.DashboardId == dashboardId);
        }


        public Task<List<Models.Dashboard>> Search(Repositories.Dashboard.DashboardRepositorySearchProperties request)
        {
            var query = _dashboards.AsQueryable();

            query = query.Where(x => x.UserId == request.CurrentUserId);

            if (!string.IsNullOrWhiteSpace(request.DashboardId))
            {
                query = query.Where(x => x.DashboardId == request.DashboardId);
            }

            if (!string.IsNullOrWhiteSpace(request.Name))
            {
                query = query.Where(x => x.Name.Contains(request.Name));
            }

            // Apply ordering: Will need to break this out into parameters
            query = query.OrderByDescending(x => x.OrderNumber);

            // NOTE: May need to check this implementation, most examples seem to be using limit instead
            query = query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize);

            return query.ToListAsync();
        }
    }
}
