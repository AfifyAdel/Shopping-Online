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
        public string Name { get; set; }
        public string Description { get; set; }
        public int UOM { get; set; }
        public long Quantity { get; set; }
        public decimal Price { get; set; }
        public int TaxId { get; set; }
        public int DiscountId { get; set; }
        public string ImagePath { get; set; }
        public string Attributes { get; set; }
    }
}
