using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models.AccountModels
{
    public class AuthModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public int Role { get; set; }
    }
}
