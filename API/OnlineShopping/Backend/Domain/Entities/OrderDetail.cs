using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class OrderDetail
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public long OrderId { get; set; }
        [Required]
        public long ItemId { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        public int TaxId { get; set; }
        public int DiscountId { get; set; }

    }
}
