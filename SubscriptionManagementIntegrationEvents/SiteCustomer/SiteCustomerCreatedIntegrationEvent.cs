using MicroservicesProjectLibrary.EventHandling.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace SubscriptionManagementIntegrationEvents.SiteCustomer
{
    public class SiteCustomerCreatedIntegrationEvent : IntegrationEvent
    {
        public SubscriptionManagementData.Models.SiteCustomer SiteCustomer { get; set; }

        public SiteCustomerCreatedIntegrationEvent(SubscriptionManagementData.Models.SiteCustomer user) => SiteCustomer = user;
    }
}