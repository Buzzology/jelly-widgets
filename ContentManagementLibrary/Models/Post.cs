using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContentManagementLibrary.Models
{
    public class Post
    {
        [Key]
        public string PostId { get; set; }

        [Required]
        public string TopicId { get; set; }

        [Required, MinLength(3), MaxLength(150)]
        public string Title { get; set; }

        [MaxLength(12000)]
        public string Content { get; set; }

        public bool Warning { get; set; }

        [Required]
        [MinLength(2)]
        public string Tags { get; set; }

        [Required]
        public PostStatus Status { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        public enum PostStatus
        {
            Active = 10,
            Deleted = 20,
        }
    }
}
