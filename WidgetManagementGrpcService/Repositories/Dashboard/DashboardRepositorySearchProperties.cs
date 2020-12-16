using MicroservicesProjectLibrary.Repositories;

namespace WidgetManagementGrpcService.Repositories.Dashboard
{
    public class DashboardRepositorySearchProperties : SearchProperties
    {
        public string DashboardId { get; set; }

        public string Text { get; set; }

        public string CurrentUserId { get; set; }
    }
}
