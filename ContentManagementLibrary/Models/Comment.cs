using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContentManagementLibrary.Models
{
    public class Comment
    {
        [Key]
        public string CommentId { get; set; }

        [Required]
        public string PostId { get; set; }

        [Required]
        public string TopicId { get; set; }

        public string ParentId { get; set; }

        public string Path { get; set; }

        public bool Warning { get; set; }

        [MaxLength(2000)]
        public string Content { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }
    }
}
