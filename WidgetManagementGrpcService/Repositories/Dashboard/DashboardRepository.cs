using AutoMapper;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
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

        
        public async Task<Models.Dashboard> Get(string id, string currentUserId)
        {
            return _dashboards
                .Find<Models.Dashboard>(dashboard => dashboard.DashboardId == id && dashboard.UserId == currentUserId)
                .FirstOrDefault();
        }


        public async Task<Models.Dashboard> Create(Models.Dashboard dashboard, string currentUserId)
        {
            dashboard.UserId = currentUserId;
            _dashboards.InsertOne(dashboard);

            return dashboard;
        }


        public async Task<Models.Dashboard> Update(Models.Dashboard dashboardIn, string currentUserId)
        {
            if (dashboardIn == null) throw new ArgumentException("No values provided for dashboard update.");

            var dashboard = await Get(dashboardIn?.DashboardId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardIn.DashboardId}");

            // Update any relevant dashboard properties
            dashboard.Name = dashboardIn.Name;
            dashboard.OrderNumber = dashboardIn.OrderNumber;

            _dashboards.ReplaceOne(dashboard => dashboard.DashboardId == dashboardIn.DashboardId, dashboardIn);

            return await Get(dashboardIn?.DashboardId, currentUserId);
        }


        public async Task<Models.Dashboard> AddWidget(string dashboardId, string dashboardWidgetId, string widgetId, int widgetOrderNumber, string currentUserId)
        {
            var dashboard = await Get(dashboardId, currentUserId);
            if(string.IsNullOrWhiteSpace(dashboard?.DashboardId)) throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardId}");

            dashboard.DashboardWidgets.Add(
                new DashboardWidget {
                    DashboardWidgetId = dashboardWidgetId,
                    DashboardId = dashboard?.DashboardId,
                    OrderNumber = widgetOrderNumber,
                    WidgetId = widgetId
                });

            _dashboards.ReplaceOne(dashboard => dashboard.DashboardId == dashboardId, dashboard);

            return await Get(dashboardId, currentUserId);
        }


        public async Task<Models.Dashboard> UpdateWidget(DashboardWidget dashboardWidgetInput, string dashboardId, string currentUserId)
        {
            var dashboard = await Get(dashboardId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardId}");
            var index = dashboard.DashboardWidgets.FindIndex(x => x.DashboardWidgetId == dashboardWidgetInput.DashboardWidgetId);
            if(index < 0) throw new KeyNotFoundException($"{nameof(DashboardWidget)} was not found: {dashboardWidgetInput.DashboardWidgetId}");

            // Modify allowable properties
            dashboard.DashboardWidgets[index].OrderNumber = dashboardWidgetInput.OrderNumber;

            // Update the dashboard
            _dashboards.ReplaceOne(dashboard => dashboard.DashboardId == dashboardId, dashboard);

            return await Get(dashboardId, currentUserId);
        }


        public async Task<Models.Dashboard> RemoveWidget(string dashboardId, string dashboardWidgetId, string currentUserId)
        {
            var dashboard = await Get(dashboardId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardId}");
            var indexToRemove = dashboard.DashboardWidgets.FindIndex(x => x.DashboardWidgetId == dashboardWidgetId);

            if (indexToRemove < 0) throw new KeyNotFoundException($"Widget not found on dashboard: {nameof(dashboardWidgetId)}: {dashboardWidgetId} {nameof(dashboardId)} {dashboardId}");

            dashboard.DashboardWidgets.RemoveAt(indexToRemove);
            _dashboards.ReplaceOne(dashboard => dashboard.DashboardId == dashboardId, dashboard);

            return await Get(dashboardId, currentUserId);
        }


        public async Task Remove(string dashboardId, string currentUserId)
        {
            _ = await Get(dashboardId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.Dashboard)} was not found: {dashboardId}");
            _dashboards.DeleteOne(dashboard => dashboard.DashboardId == dashboardId);
        }


        public Task<List<Models.Dashboard>> Search(DashboardRepositorySearchProperties request)
        {
            var query = _dashboards.AsQueryable();

            query = query.Where(x => x.UserId == request.CurrentUserId);

            if (!string.IsNullOrWhiteSpace(request.DashboardId))
            {
                query = query.Where(x => x.DashboardId == request.DashboardId);
            }

            if (!string.IsNullOrWhiteSpace(request.Text))
            {
                query = query.Where(x => x.Name.Contains(request.Text));
            }

            // Apply ordering
            query = query.OrderByDescending(x => x.OrderNumber);

            // NOTE: May need to check this implementation, most examples seem to be using limit instead
            query = query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize);

            return query.ToListAsync();
        }
    }
}
