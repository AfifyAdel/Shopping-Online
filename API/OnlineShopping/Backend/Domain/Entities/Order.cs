using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class Order
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public DateTime RequestDate { get; set; }
        public DateTime? DueDate { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public long UserId { get; set; }
        public int TaxId { get; set; }
        public int DiscountId { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        [NotMapped]
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
