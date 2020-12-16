using System.Collections.Generic;
using System.Threading.Tasks;
using WidgetManagementData.Models;
using Models = WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Repositories.Dashboard
{
    public interface IDashboardRepository
    {
        public Task<List<Models.Dashboard>> Search(DashboardRepositorySearchProperties request);
        public Task<Models.Dashboard> Get(string id, string currentUserId);
        public Task<Models.Dashboard> Create(Models.Dashboard dashboard, string currentUserId);
        public Task<Models.Dashboard> Update(Models.Dashboard dashboardIn, string currentUserId);
        public Task Remove(string dashboardId, string currentUserId);
        public Task<Models.Dashboard> RemoveWidget(string dashboardId, string dashboardWidgetId, string currentUserId);
        public Task<Models.Dashboard> AddWidget(string dashboardId, string dashboardWidgetId, string widgetId, int widgetOrderNumber, string currentUserId);
        public Task<Models.Dashboard> UpdateWidget(DashboardWidget dashboardWidget, string dashboardId, string currentUserId);
    }
}