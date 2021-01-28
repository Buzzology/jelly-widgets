using MicroservicesProjectLibrary.EventHandling.EventBus;
using Microsoft.Extensions.Logging;
using SubscriptionManagementGrpcService.Infrastructure;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Repositories.Subscription
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private ILogger<SubscriptionRepository> _logger { get; init; }
        private SubscriptionManagementDbContext _subscriptionManagementDbContext { get; init; }

        public SubscriptionRepository(
            ILogger<SubscriptionRepository> logger,
            SubscriptionManagementDbContext subscriptionManagementDbContext
            )
        {
            _logger = logger;
            _subscriptionManagementDbContext = subscriptionManagementDbContext;
        }

        public async Task<bool> UserHasActiveSubscription(string userDetailId)
        {
            // Retrieve a subscription where the expiry is greater than or equal to now
            var activeSubscription = _subscriptionManagementDbContext.Subscriptions
                .FirstOrDefault(x => x.UserDetailId == userDetailId && x.Expires >= DateTime.UtcNow);

            return activeSubscription != null;
        }
    }
}
