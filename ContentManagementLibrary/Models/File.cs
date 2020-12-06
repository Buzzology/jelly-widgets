using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContentManagementLibrary.Models
{
    public class File
    {
        [Key]
        public string FileId { get; set; }

        [Required]
        public FileTypeEnum Type { get; set; }

        [Required, MinLength(1), MaxLength(50)]
        public string Filename { get; set; }

        [Required, MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public FileStatusEnum Status { get; set; }

        [Required]
        public string Extension { get; set; }

        [Required]
        public string ExternalReference { get; set; }

        [Required]
        public string EntityId { get; set; }

        [Required]
        public EntityTypeEnum EntityType { get; set; }

        public bool Warning { get; set; }

        [Required]
        public string UpdatedBy { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        [Required]
        public DateTime Created { get; set; }
    }

    public enum FileTypeEnum
    {
        Default = 10,
        Image = 20,
    }

    public enum FileStatusEnum
    {
        PendingUpload = 10,
        Active = 20,
    }
}
