using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Stripe;
using SubscriptionManagementGrpcService.EventHandling;
using SubscriptionManagementGrpcService.Infrastructure;
using SubscriptionManagementGrpcService.Repositories.Subscription;
using System;
using System.IO;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Repositories.StripeEventLog
{
    public class StripeEventLogRepository : IStripeEventLogRepository
    {
        private readonly SubscriptionManagementDbContext _subscriptionManagementDbContext;
        private readonly ISubscriptionManagementIntegrationEventService _subscriptionManagementIntegrationEventService;
        private readonly ISubscriptionRepository _subscriptionRepository;
        private string WebhookSecret { get; init; } = "whsec_542IgQFtoDM2gpoEkGUCRRRc1uCKtrtE"; // TODO: (CJO) Move this to config


        public StripeEventLogRepository(
                ILogger<StripeEventLogRepository> logger,
                ISubscriptionManagementIntegrationEventService subscriptionManagementIntegrationEventService,
                SubscriptionManagementDbContext subscriptionManagementDbContext,
                ISubscriptionRepository subscriptionRepository
            )
        {
            _subscriptionManagementDbContext = subscriptionManagementDbContext;
            _subscriptionManagementIntegrationEventService = subscriptionManagementIntegrationEventService;
            _subscriptionRepository = subscriptionRepository;
        }


        public async Task ProcessStripeEvent(string payload, string stripeSignature)
        {
            Event stripeEvent = EventUtility.ConstructEvent(
                payload,
                stripeSignature,
                WebhookSecret
            );

            Console.WriteLine($"Webhook notification with type: {stripeEvent.Type} found for {stripeEvent.Id}");

            // Create the event
            _subscriptionManagementDbContext.StripeEventLogs.Add(
                new SubscriptionManagementData.Models.StripeEventLog
                {
                    StripeEventLogId = stripeEvent.Id,
                    Data = payload,
                    Type = stripeEvent.Type,
                    Created = DateTime.UtcNow,
                });
            _subscriptionManagementDbContext.SaveChanges();

            // Now process the event
            switch (stripeEvent.Type)
            {
                case "customer.subscription.created":
                    {
                        var stripeSubscription = stripeEvent.Data.Object as Stripe.Subscription;
                        await _subscriptionRepository.Create(
                            new SubscriptionManagementData.Models.Subscription
                            {
                                SubscriptionId = stripeSubscription.Id,
                                ExternalCustomerId = stripeSubscription.CustomerId,
                                // UserDetailId Assigned by service
                                // SiteCustomerID Assigned by service
                                CurrentPeriodStart = stripeSubscription.CurrentPeriodStart,
                                CurrentPeriodEnd = stripeSubscription.CurrentPeriodEnd,
                                CancelAtPeriodEnd = stripeSubscription.CancelAtPeriodEnd,
                                ExternalStatus = stripeSubscription.Status,
                            });
                        break;
                    }

                case "customer.subscription.updated":
                    {
                        var stripeSubscription = stripeEvent.Data.Object as Stripe.Subscription;
                        await _subscriptionRepository.Update(
                            new SubscriptionManagementData.Models.Subscription
                            {
                                SubscriptionId = stripeSubscription.Id,
                                CurrentPeriodStart = stripeSubscription.CurrentPeriodStart,
                                CurrentPeriodEnd = stripeSubscription.CurrentPeriodEnd,
                                CancelAtPeriodEnd = stripeSubscription.CancelAtPeriodEnd,
                                ExternalStatus = stripeSubscription.Status,
                            });
                        break;
                    }

                case "invoice.paid":
                    {
                        // TODO: (CJO) To send them a notification that their subscription has been automatically renewed
                        // Used to provision services after the trial has ended.
                        // The status of the invoice will show up as paid. Store the status in your
                        // database to reference when a user accesses your service to avoid hitting rate
                        // limits.
                        break;
                    }


                case "invoice.payment_failed":
                    {
                        // TODO: (CJO) THis is for if the subscription renewal fails
                        // If the payment fails or the customer does not have a valid payment method,
                        // an invoice.payment_failed event is sent, the subscription becomes past_due.
                        // Use this webhook to notify your user that their payment has
                        // failed and to retrieve new card details.
                        break;
                    }

                case "customer.subscription.deleted":
                    {
                        // TODO: (CJO) I don't think we need to handle this. It will just expire once the period ends.
                        // handle subscription cancelled automatically based
                        // upon your subscription settings. Or if the user cancels it.
                        break;
                    }


            }
        }
    }
}