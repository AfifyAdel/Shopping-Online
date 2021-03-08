using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class Tax
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public decimal Value { get; set; }
    }
}
