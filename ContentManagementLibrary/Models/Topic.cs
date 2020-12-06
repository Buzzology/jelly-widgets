using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContentManagementLibrary.Models
{
    public class Topic
    {
        [Key]
        public string TopicId { get; set; }

        [Required, MinLength(3), MaxLength(25)]
        [RegularExpression(@"^[a-zA-Z0-9_-]+$", ErrorMessage = "Topic name can only contain numbers, letters and underscores.")]
        public string Name { get; set; }

        [Required, MinLength(3), MaxLength(255)]
        public string Description { get; set; }

        public TopicInviteType InviteType { get; set; }

        public bool Warning { get; set; }

        public TopicStatus Status { get; set; }

        [Required]
        public string OwnerId { get; set; }

        [Required]
        public string CreatedBy
        {
            get; set;
        }

        [Required]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        public enum TopicStatus
        {
            Active = 10,
            Disabled = 20,
        }

        public enum TopicInviteType
        {
            Open = 10,
            AdminApprovalRequired = 20,
        }

        public enum OrderType
        {
            None = 0,
            Created = 10,
            CreatedDesc = 20,
            Updated = 30,
            UpdatedDesc = 40,
            Alphabetical = 50,
            AlphabeticalDesc = 60,
        }
    }
}
