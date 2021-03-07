using System.Collections.Generic;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Repositories.Subscription
{
    public interface ISubscriptionRepository
    {
        Task<bool> UserHasActiveSubscription(string userDetailId);
        Task<SubscriptionManagementData.Models.Subscription> Create(SubscriptionManagementData.Models.Subscription subscription);
        Task<SubscriptionManagementData.Models.Subscription> Update(SubscriptionManagementData.Models.Subscription subscription);
        Task<List<SubscriptionManagementData.Models.Subscription>> Search(SubscriptionRepositorySearchProperties searchProperties, string currentUserId);
    }
}