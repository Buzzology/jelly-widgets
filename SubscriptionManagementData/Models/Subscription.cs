using System;
using System.ComponentModel.DataAnnotations;

namespace SubscriptionManagementData.Models
{
    public class Subscription
    {
        [Key]
        public string SubscriptionId { get; set; }

        [Required]
        public string UserDetailId { get; set; }

        [Required]
        public DateTime Expires { get; set; }
    }
}
