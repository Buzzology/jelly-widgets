using System;
using System.ComponentModel.DataAnnotations;

namespace SubscriptionManagementData.Models
{
    public class Subscription
    {
        [Key]
        public string SubscriptionId { get; set; } // NOTE: This is the stripe subscription id

        public string ExternalCustomerId { get; set; }

        [Required]
        public string UserDetailId { get; set; }

        [Required]
        public string SiteCustomerId { get; set; }

        public DateTime CurrentPeriodEnd { get; set; } // Stripe current_period_end

        public DateTime CurrentPeriodStart { get; set; } // Stripe current_period_end

        public bool CancelAtPeriodEnd { get; set; }

        public bool Active { get; set; }

        public string ExternalStatus { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }
    }
}