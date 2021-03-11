﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public decimal Value { get; set; }
    }
}
