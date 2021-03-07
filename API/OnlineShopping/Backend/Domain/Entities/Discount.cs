using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Discount
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public decimal Value { get; set; }
    }
}
