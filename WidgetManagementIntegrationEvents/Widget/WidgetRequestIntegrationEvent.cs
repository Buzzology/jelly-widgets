using MicroservicesProjectLibrary.EventHandling.Events;

namespace WidgetManagementIntegrationEvents.Widget
{
    public class WidgetRequestIntegrationEvent : IntegrationEvent
    {
        public string UserId { get; set; }

        public string Payload { get; set; }

        public WidgetRequestIntegrationEvent(string userId, string payload)
        {
            UserId = userId;
            Payload = payload;
        }
    }
}
