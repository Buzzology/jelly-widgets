using MicroservicesProjectLibrary.EventHandling.Events;

namespace SubscriptionManagementIntegrationEvents.SiteCustomer
{
    public class SiteCustomerUpdatedIntegrationEvent : IntegrationEvent
    {
        public SubscriptionManagementData.Models.SiteCustomer SiteCustomer { get; set; }

        public SiteCustomerUpdatedIntegrationEvent(SubscriptionManagementData.Models.SiteCustomer siteCustomer) => SiteCustomer = siteCustomer;
    }
}