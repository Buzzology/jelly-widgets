using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SubscriptionManagementGrpcService.EventHandling;
using SubscriptionManagementGrpcService.Infrastructure;
using SubscriptionManagementIntegrationEvents.Subscription;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Repositories.Subscription
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private ILogger<SubscriptionRepository> _logger { get; init; }
        private SubscriptionManagementDbContext _subscriptionManagementDbContext { get; init; }
        private readonly ISubscriptionManagementIntegrationEventService _subscriptionManagementIntegrationEventService;

        public SubscriptionRepository(
            ILogger<SubscriptionRepository> logger,
            SubscriptionManagementDbContext subscriptionManagementDbContext,
            ISubscriptionManagementIntegrationEventService subscriptionManagementIntegrationEventService
            )
        {
            _logger = logger;
            _subscriptionManagementDbContext = subscriptionManagementDbContext;
            _subscriptionManagementIntegrationEventService = subscriptionManagementIntegrationEventService;
        }

        public async Task<bool> UserHasActiveSubscription(string userDetailId)
        {
            // Retrieve a subscription where the expiry is greater than or equal to now
            var activeSubscription = _subscriptionManagementDbContext.Subscriptions
                .FirstOrDefault(x =>
                    x.UserDetailId == userDetailId
                    && x.Active
                    && x.CurrentPeriodStart <= DateTime.UtcNow
                    && x.CurrentPeriodEnd >= DateTime.UtcNow
                );

            return activeSubscription != null;
        }


        public async Task<SubscriptionManagementData.Models.Subscription> Create(SubscriptionManagementData.Models.Subscription subscriptionInput)
        {
            var existingSubscription = _subscriptionManagementDbContext.Subscriptions.FirstOrDefault(x => x.SubscriptionId == subscriptionInput.SubscriptionId);
            if (existingSubscription != null)
            {
                throw new ArgumentException($"{nameof(SubscriptionManagementData.Models.Subscription)} already exists.");
            }

            // Retrieve the site customer
            var siteCustomer = _subscriptionManagementDbContext.SiteCustomers.FirstOrDefault(x => x.ExternalCustomerId == x.ExternalCustomerId);
            if(siteCustomer == null)
            {
                throw new ArgumentException($"{nameof(SubscriptionManagementData.Models.SiteCustomer)} does not exist.");
            }

            var subscription = new SubscriptionManagementData.Models.Subscription();
            subscription.SubscriptionId = subscriptionInput.SubscriptionId;
            subscription.ExternalCustomerId = subscriptionInput.ExternalCustomerId;
            subscription.SiteCustomerId = siteCustomer.SiteCustomerId;
            subscription.UserDetailId = siteCustomer.UserDetailId;
            subscription.CurrentPeriodEnd = subscriptionInput.CurrentPeriodEnd;
            subscription.CurrentPeriodStart = subscriptionInput.CurrentPeriodStart;
            subscription.CancelAtPeriodEnd = subscriptionInput.CancelAtPeriodEnd;
            subscription.Active = subscriptionInput.Active;
            subscription.ExternalStatus = subscriptionInput.ExternalStatus;
            subscription.Created = DateTime.UtcNow;
            subscription.Updated = DateTime.UtcNow;

            // Validate
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(subscription, new ValidationContext(subscription, null, null), validationResults, true))
            {
                throw new ArgumentException(validationResults.First().ErrorMessage);
            }

            _subscriptionManagementDbContext.Subscriptions.Add(subscription);

            // Save siteCustomer and then publish
            var @event = new SubscriptionCreatedIntegrationEvent(subscription);
            await _subscriptionManagementIntegrationEventService.SaveEventAndContentManagementContextChangesAsync(@event);
            await _subscriptionManagementIntegrationEventService.PublishThroughEventBusAsync(@event);

            return subscription;
        }


        public async Task<SubscriptionManagementData.Models.Subscription> Update(SubscriptionManagementData.Models.Subscription subscriptionInput)
        {
            var subscription = _subscriptionManagementDbContext.Subscriptions.FirstOrDefault(x => x.SubscriptionId == subscriptionInput.SubscriptionId);
            if (subscription == null)
            {
                throw new ArgumentException($"{nameof(SubscriptionManagementData.Models.Subscription)} does not exist.");
            }

            subscription.CurrentPeriodEnd = subscriptionInput.CurrentPeriodEnd;
            subscription.CurrentPeriodStart = subscriptionInput.CurrentPeriodStart;
            subscription.CancelAtPeriodEnd = subscriptionInput.CancelAtPeriodEnd;
            subscription.Active = subscriptionInput.Active;
            subscription.ExternalStatus = subscriptionInput.ExternalStatus;
            subscription.Updated = DateTime.UtcNow;

            // Validate
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(subscription, new ValidationContext(subscription, null, null), validationResults, true))
            {
                throw new ArgumentException(validationResults.First().ErrorMessage);
            }

            // Save siteCustomer and then publish
            var @event = new SubscriptionCreatedIntegrationEvent(subscription);
            await _subscriptionManagementIntegrationEventService.SaveEventAndContentManagementContextChangesAsync(@event);
            await _subscriptionManagementIntegrationEventService.PublishThroughEventBusAsync(@event);

            return subscription;
        }


        public Task<List<SubscriptionManagementData.Models.Subscription>> Search(SubscriptionRepositorySearchProperties searchProperties, string currentUserId)
        {
            IQueryable<SubscriptionManagementData.Models.Subscription> query = from subscription in _subscriptionManagementDbContext.Subscriptions select subscription;

            if (searchProperties != null)
            {
                //if (searchProperties.UserIds != null && searchProperties.UserIds.Any())
                //{
                //    query = query.Where(x => searchProperties.UserIds.Contains(x.UserDetailId));
                //}

                if(searchProperties.UserId != null)
                {
                    query = query.Where(x => x.UserDetailId == searchProperties.UserId);
                }

                if (!string.IsNullOrWhiteSpace(searchProperties.SiteCustomerId))
                {
                    query = query.Where(x => x.SiteCustomerId == searchProperties.SiteCustomerId);
                }

                if (searchProperties.Active != null)
                {
                    query = query.Where(x => x.Active == searchProperties.Active);
                }

                if (searchProperties.SubscriptionId != null)
                {
                    query = query.Where(x => x.SubscriptionId == searchProperties.SubscriptionId);
                }

                query = query.Skip((searchProperties.PageNumber - 1) * searchProperties.PageSize).Take(searchProperties.PageSize);
            }

            return query.ToListAsync();
        }
    }
}
