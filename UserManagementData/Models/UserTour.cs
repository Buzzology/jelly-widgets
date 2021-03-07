using System;
using System.ComponentModel.DataAnnotations;

namespace UserManagementData.Models
{
    public class UserTour
    {
        [Key]
        public string UserTourId { get; set; }

        [Required]
        public string TourId { get; set; }

        [Required]
        public string UserDetailId { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }
    }
}
