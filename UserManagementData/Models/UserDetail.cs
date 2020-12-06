using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace UserManagementData.Models
{
    public class UserDetail
    {
        [Key]
        public string UserDetailId { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public string ExternalReferenceId { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        public string ImageId { get; set; }
    }
}
