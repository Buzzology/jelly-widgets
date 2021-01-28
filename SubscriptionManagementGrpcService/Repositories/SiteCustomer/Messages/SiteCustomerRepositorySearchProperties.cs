using MicroservicesProjectLibrary.Repositories;
using System.Collections.Generic;

namespace SubscriptionManagementGrpcService.Repositories.SiteCustomer
{
    public class SiteCustomerRepositorySearchProperties : SearchProperties
    {
        public List<string> UserIds { get; set; }
    }
}