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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [StringLength(50)]
        public string UserName { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int RoleId { get; set; }
        [NotMapped]
        public ICollection<Order> Orders { get; set; }
        [NotMapped]
        public string Token { get; set; }
    }
}
