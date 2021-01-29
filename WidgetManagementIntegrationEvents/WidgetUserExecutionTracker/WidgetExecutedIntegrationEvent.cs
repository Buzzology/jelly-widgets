using MicroservicesProjectLibrary.EventHandling.Events;

namespace WidgetManagementIntegrationEvents.Widget
{
    public class WidgetExecutedIntegrationEvent : IntegrationEvent
    {
        public string WidgetId { get; set; }

        public string UserId { get; set; }

        public WidgetExecutedIntegrationEvent(string userId, string widgetId)
        {
            UserId = userId;
            WidgetId = widgetId;
        }
    }
}