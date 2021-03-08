using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Discount
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public decimal Value { get; set; }
    }
}
