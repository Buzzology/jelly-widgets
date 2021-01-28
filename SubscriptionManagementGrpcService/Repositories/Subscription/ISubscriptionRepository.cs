using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Repositories.Subscription
{
    public interface ISubscriptionRepository
    {
        Task<bool> UserHasActiveSubscription(string userDetailId);
    }
}
