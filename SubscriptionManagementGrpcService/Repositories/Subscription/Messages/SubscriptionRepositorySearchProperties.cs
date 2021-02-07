using MicroservicesProjectLibrary.Repositories;
using System.Collections.Generic;

namespace SubscriptionManagementGrpcService.Repositories.Subscription
{
    public class SubscriptionRepositorySearchProperties : SearchProperties
    {
        public List<string> UserIds { get; set; }

        public string SiteCustomerId { get; set; }

        public bool? Active { get; set; }

        public string SubscriptionId { get; set; }
    }
}