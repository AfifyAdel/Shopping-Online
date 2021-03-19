using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Item
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int UOM { get; set; }
        [Required]
        public long Quantity { get; set; }
        [Required]
        public decimal Price { get; set; }
        public int TaxId { get; set; }
        public int DiscountId { get; set; }
        public string ImagePath { get; set; }
        public string Attributes { get; set; }
    }
}
