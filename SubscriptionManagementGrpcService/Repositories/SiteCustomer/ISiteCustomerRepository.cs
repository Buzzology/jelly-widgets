using SubscriptionManagementGrpcService.Repositories.SiteCustomer.Messages;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Repositories.SiteCustomer
{
    public interface ISiteCustomerRepository
    {
        Task<SubscriptionManagementData.Models.SiteCustomer> Create(SubscriptionManagementData.Models.SiteCustomer userInput, string userId);
        Task<SubscriptionManagementData.Models.SiteCustomer> Get(string userId, string currentUserId);
        Task<List<SubscriptionManagementData.Models.SiteCustomer>> Search(SiteCustomerRepositorySearchProperties searchProperties);
        Task<SubscriptionManagementData.Models.SiteCustomer> Update(SubscriptionManagementData.Models.SiteCustomer userInput, string userId);
        Task<string> GetStripeCheckoutSessionId(GetStripeCheckoutSessionIdRequest req);
        Task<string> GetAccountManagementUrl(string returnUrl, string userDetailId);
    }
}
