using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class UnitOfMeasure
    {
        [Key]
        public int Id { get; set; }
        public string UOM { get; set; }
        public string Description { get; set; }
    }
}
