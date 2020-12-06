using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContentManagementLibrary.Models
{
    public class Membership
    {
        [Key]
        public string MembershipId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string TopicId { get; set; }

        public MemebershipType Type { get; set; }

        [Required]
        public MembershipStatus Status { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }


        public enum MembershipStatus
        {
            Pending = 10,
            Declined = 20,
            Banned = 30,
            Approved = 40,
        }


        public enum MemebershipType
        {
            User = 10,
            Admin = 20,
            Moderator = 30,
        }
    }
}
