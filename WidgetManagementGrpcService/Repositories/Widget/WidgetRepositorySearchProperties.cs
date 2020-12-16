using MicroservicesProjectLibrary.Repositories;

namespace WidgetManagementGrpcService.Repositories.Widget
{
    public class WidgetRepositorySearchProperties : SearchProperties
    {
        public string WidgetId { get; set; }

        public string Text { get; set; }

        public string CurrentUserId { get; set; }
    }
}
