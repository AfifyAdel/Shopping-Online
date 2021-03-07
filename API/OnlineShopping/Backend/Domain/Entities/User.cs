using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CustomerDescriptionL { get; set; }
        public string CustomerDescriptionA { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
