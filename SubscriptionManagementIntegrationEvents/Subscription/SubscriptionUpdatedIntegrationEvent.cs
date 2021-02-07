using MicroservicesProjectLibrary.EventHandling.Events;

namespace SubscriptionManagementIntegrationEvents.Subscription
{
    public class SiteCustomerUpdatedIntegrationEvent : IntegrationEvent
    {
        public SubscriptionManagementData.Models.Subscription Subscription { get; set; }

        public SiteCustomerUpdatedIntegrationEvent(SubscriptionManagementData.Models.Subscription Subscription) => Subscription = Subscription;
    }
}