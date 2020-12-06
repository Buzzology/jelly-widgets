using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContentManagementLibrary.Models
{
    public class Subject
    {
        [Key]
        public string SubjectId { get; set; }

        [Required]
        public string TopicId { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

        [MaxLength(50)]
        public string Tags { get; set; }

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
