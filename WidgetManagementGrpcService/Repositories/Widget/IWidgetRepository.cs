using System.Collections.Generic;
using System.Threading.Tasks;
using Models = WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Repositories.Widget
{
    public interface IWidgetRepository
    {
        public Task<List<Models.Widget>> Search(WidgetRepositorySearchProperties request);
        public Task<Models.Widget> Get(string id, string currentUserId);
        public Task<Models.Widget> Create(Models.Widget dashboard, string currentUserId);
        public Task<Models.Widget> Update(Models.Widget dashboardIn, string currentUserId);
        public Task Remove(string dashboardId, string currentUserId);
        public Task<Dictionary<string, string>> ProcessMessage(string widgetId, string dashboardWidgetId, string currentUserId, Dictionary<string, string> payloads);
    }
}