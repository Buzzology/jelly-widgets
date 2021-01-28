using System;
using System.ComponentModel.DataAnnotations;

namespace SubscriptionManagementData.Models
{
    public class SiteCustomer
    {
        [Key]
        public string SiteCustomerId { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string UserDetailId { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        public string ExternalCustomerId { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }
    }
}
