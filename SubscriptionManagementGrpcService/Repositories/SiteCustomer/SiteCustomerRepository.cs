using MicroservicesProjectLibrary.EventHandling.EventBus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Stripe;
using Stripe.Checkout;
using SubscriptionManagementGrpcService.EventHandling;
using SubscriptionManagementGrpcService.Infrastructure;
using SubscriptionManagementGrpcService.Repositories.SiteCustomer.Messages;
using SubscriptionManagementIntegrationEvents.SiteCustomer;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Repositories.SiteCustomer
{
    public class SiteCustomerRepository : ISiteCustomerRepository
    {
        private readonly SubscriptionManagementDbContext _subscriptionManagementDbContext;
        private readonly ISubscriptionManagementIntegrationEventService _subscriptionManagementIntegrationEventService;
        private readonly CustomerService _stripeCustomerService;
        private readonly SessionService _stripeCheckoutSessionService;

        public SiteCustomerRepository(
                ILogger<SiteCustomerRepository> logger,
                ISubscriptionManagementIntegrationEventService subscriptionManagementIntegrationEventService,
                CustomerService stripeCustomerService,
                SessionService stripeCheckoutSessionService,
                SubscriptionManagementDbContext subscriptionManagementDbContext
            )
        {
            _subscriptionManagementDbContext = subscriptionManagementDbContext;
            _subscriptionManagementIntegrationEventService = subscriptionManagementIntegrationEventService;
            _stripeCustomerService = stripeCustomerService;
            _stripeCheckoutSessionService = stripeCheckoutSessionService;
        }


        public async Task<SubscriptionManagementData.Models.SiteCustomer> Create(SubscriptionManagementData.Models.SiteCustomer siteCustomerInput, string siteCustomerId)
        {
            // Ensure that the siteCustomer doesn't already exist
            var existingUser = _subscriptionManagementDbContext.SiteCustomers.FirstOrDefault(x => x.SiteCustomerId == siteCustomerInput.SiteCustomerId);
            if (existingUser != null)
            {
                throw new ArgumentException($"Customer already exists.");
            }

            var siteCustomer = new SubscriptionManagementData.Models.SiteCustomer();
            siteCustomer.SiteCustomerId = siteCustomerInput.SiteCustomerId;
            siteCustomer.UserDetailId = siteCustomerInput.UserDetailId;
            siteCustomer.EmailAddress = siteCustomerInput.EmailAddress;
            siteCustomer.DisplayName = siteCustomerInput.DisplayName;
            siteCustomer.ExternalCustomerId = siteCustomerInput.ExternalCustomerId;
            siteCustomer.Updated = DateTime.UtcNow;
            siteCustomer.Created = DateTime.UtcNow;

            // Validate
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(siteCustomer, new ValidationContext(siteCustomer, null, null), validationResults, true))
            {
                throw new ArgumentException(validationResults.First().ErrorMessage);
            }

            // Now we try to create the external customer id
            var stripeCustomer = _stripeCustomerService.Create(
                new CustomerCreateOptions
                {
                    Email = siteCustomer.EmailAddress,
                    Name = siteCustomer.DisplayName,
                });

            if (stripeCustomer?.Id == null || string.IsNullOrWhiteSpace(stripeCustomer.Id)) throw new ArgumentException($"Failed to create stripe customer for: {siteCustomer.UserDetailId}");

            siteCustomer.ExternalCustomerId = stripeCustomer.Id;
            _subscriptionManagementDbContext.SiteCustomers.Add(siteCustomer);

            // Save siteCustomer and then publish
            var @event = new SiteCustomerCreatedIntegrationEvent(siteCustomer);
            await _subscriptionManagementIntegrationEventService.SaveEventAndContentManagementContextChangesAsync(@event);
            await _subscriptionManagementIntegrationEventService.PublishThroughEventBusAsync(@event);

            return siteCustomer;
        }


        public Task<SubscriptionManagementData.Models.SiteCustomer> Get(string siteCustomerId, string currentUserId)
        {
            return _subscriptionManagementDbContext.SiteCustomers.FirstOrDefaultAsync(x => x.SiteCustomerId == siteCustomerId);
        }


        public async Task<string> GetStripeCheckoutSessionId(GetStripeCheckoutSessionIdRequest request)
        {
            if (request == null) throw new ArgumentException($"{nameof(GetStripeCheckoutSessionId)} a request is required.");

            var siteCustomer = (await Search(new SiteCustomerRepositorySearchProperties
            {
                UserIds = new List<string> { request.UserDetailId },
                UserId = request.CurrentUserId,
            }))?.FirstOrDefault();

            if (siteCustomer == null) throw new ArgumentException($"{nameof(siteCustomer)} not found for {request?.UserDetailId}.");

            // Create the checkout session
            var checkoutCreateOptions = new SessionCreateOptions
            {
                // See https://stripe.com/docs/api/checkout/sessions/create
                // for additional parameters to pass.
                // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
                // the actual Session ID is returned in the query parameter when your customer
                // is redirected to the success page.
                Customer = siteCustomer.ExternalCustomerId,
                SuccessUrl = "https://localhost:3000/payments/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "https://localhost:3000/payments/cancelled",
                PaymentMethodTypes = new List<string>
                {
                    request.PaymentMethodType, //"card",
                },
                Mode = request.Mode, // "subscription",
                LineItems = request.LineItems?.Select(x => {
                    return new SessionLineItemOptions {
                        Price = x.PriceId,
                        Quantity = x.Quantity, // For metered billing, do not pass quantity
                    };
                })?.ToList()
            };

            try
            {
                // Create the stripe session id
                var session = await _stripeCheckoutSessionService.CreateAsync(checkoutCreateOptions);

                return session?.Id ?? throw new ArgumentException("Failed to create stripe session.");
            }
            catch (StripeException e)
            {
                Console.WriteLine(e.StripeError.Message);
                throw;
            }
        }


        public async Task<string> GetAccountManagementUrl(string returnUrl, string userDetailId)
        {
            var siteCustomer = (await Search(new SiteCustomerRepositorySearchProperties
            {
                UserIds = new List<string> { userDetailId },
                UserId = userDetailId,
            }))?.FirstOrDefault();

            if (siteCustomer == null) throw new ArgumentException($"{nameof(siteCustomer)} not found for {userDetailId}.");

            // Create the checkout session
            var options = new Stripe.BillingPortal.SessionCreateOptions
            {
                Customer = siteCustomer.ExternalCustomerId,
                ReturnUrl = returnUrl,
            };

            try
            {
                var sessionService = new Stripe.BillingPortal.SessionService();
                var session = sessionService.Create(options);

                return session?.Url ?? throw new ArgumentException("Failed to create stripe URL.");
            }
            catch (StripeException e)
            {
                Console.WriteLine(e.StripeError.Message);
                throw;
            }
        }


        public Task<List<SubscriptionManagementData.Models.SiteCustomer>> Search(SiteCustomerRepositorySearchProperties searchProperties)
        {
            IQueryable<SubscriptionManagementData.Models.SiteCustomer> query = from siteCustomer in _subscriptionManagementDbContext.SiteCustomers select siteCustomer;

            if (searchProperties != null)
            {
                if (searchProperties.UserIds != null && searchProperties.UserIds.Any())
                {
                    query = query.Where(x => searchProperties.UserIds.Contains(x.UserDetailId));
                }

                query = query.Skip((searchProperties.PageNumber - 1) * searchProperties.PageSize).Take(searchProperties.PageSize);
            }

            return query.ToListAsync();
        }


        public async Task<SubscriptionManagementData.Models.SiteCustomer> Update(SubscriptionManagementData.Models.SiteCustomer siteCustomerInput, string currentUserId)
        {
            // Ensure that only the siteCustomer can only update their own profile           
            if (siteCustomerInput.SiteCustomerId != currentUserId)
            {
                throw new UnauthorizedAccessException("Can only update your own profile.");
            }

            var siteCustomer = await Get(siteCustomerInput.SiteCustomerId, currentUserId);
            if (siteCustomer == null) throw new ArgumentException($"User not found.");

            siteCustomer.DisplayName = siteCustomerInput.DisplayName;
            siteCustomer.EmailAddress = siteCustomerInput.EmailAddress;
            siteCustomer.Updated = DateTime.UtcNow;

            // Validate
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(siteCustomer, new ValidationContext(siteCustomer, null, null), validationResults, true))
            {
                throw new ArgumentException(validationResults.First().ErrorMessage);
            }

            // Save siteCustomer and then publish
            var @event = new SiteCustomerUpdatedIntegrationEvent(siteCustomer);
            await _subscriptionManagementIntegrationEventService.SaveEventAndContentManagementContextChangesAsync(@event);
            await _subscriptionManagementIntegrationEventService.PublishThroughEventBusAsync(@event);

            return siteCustomer;
        }
    }
}