using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class Order
    {
        [Key]
        public long Id { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? RequestDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int Status { get; set; }
        public string CustomerId { get; set; }
        public User Customer { get; set; }
        public int TaxId { get; set; }
        public int DiscountId { get; set; }
        public Tax Tax { get; set; }
        public Discount Discount { get; set; }
        public decimal TotalPrice { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
