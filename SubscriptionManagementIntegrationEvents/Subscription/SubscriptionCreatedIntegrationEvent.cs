using MicroservicesProjectLibrary.EventHandling.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace SubscriptionManagementIntegrationEvents.Subscription
{
    public class SubscriptionCreatedIntegrationEvent : IntegrationEvent
    {
        public SubscriptionManagementData.Models.Subscription Subscription { get; set; }

        public SubscriptionCreatedIntegrationEvent(SubscriptionManagementData.Models.Subscription user) => Subscription = user;
    }
}