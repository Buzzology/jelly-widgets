using System.Collections.Generic;
using System.Threading.Tasks;
using Models = WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Repositories.Dashboard
{
    public interface IDashboardRepository
    {
        public Task<List<Models.Dashboard>> Search(DashboardRepositorySearchProperties request);
        public Models.Dashboard Get(string id, string currentUserId);
        public Models.Dashboard Create(Models.Dashboard dashboard, string currentUserId);
        public void Update(Models.Dashboard dashboardIn, string currentUserId);
        public void Remove(string dashboardId, string currentUserId);
        public void RemoveWidget(string dashboardId, string widgetId, int widgetOrderNumber, string currentUserId);
        public void AddWidget(string dashboardId, string widgetId, int widgetOrderNumber, string currentUserId);
    }
}