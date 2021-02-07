using System;
using System.ComponentModel.DataAnnotations;

namespace SubscriptionManagementData.Models
{
    public class StripeEventLog
    {
        [Key]
        public string StripeEventLogId { get; set; } // NOTE: This is the actual stripe event id. Used as the key to prevent duplicates.

        public string Data { get; set; }

        [Required]
        public string Type { get; set; }

        public DateTime Created { get; set; }
    }
}