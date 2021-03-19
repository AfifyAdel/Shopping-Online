using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class User 
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [MaxLength(50)]
        [Required]
        public string LastName { get; set; }
        [MaxLength(50)]
        [Required]
        public string UserName { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        [Required]
        public DateTime? BirthDate { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }
        [Required]
        public int RoleId { get; set; }
        [NotMapped]
        public ICollection<Order> Orders { get; set; }
        [NotMapped]
        public string Token { get; set; }
    }
}
