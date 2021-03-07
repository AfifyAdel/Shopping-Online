﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class UnitOfMeasure
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UOM { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
