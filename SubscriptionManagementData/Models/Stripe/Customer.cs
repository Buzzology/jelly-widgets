using System;
using System.ComponentModel.DataAnnotations;

namespace SubscriptionManagementData.Models.Stripe
{
    public class SiteCustomer
    {
        [Key]
        public string SiteCustomerId { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public string ExternalCustomerId { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }
    }
}
