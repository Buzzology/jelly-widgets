using MicroservicesProjectLibrary.Repositories;

namespace WidgetManagementGrpcService.Repositories.Dashboard
{
    public class DashboardRepositorySearchProperties : SearchProperties
    {
        public string DashboardId { get; set; }

        public string Name { get; set; }

        public string CurrentUserId { get; set; }
    }
}
