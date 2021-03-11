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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long OrderId { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Order Order { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ItemId { get; set; }
        public decimal ItemPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int UOM { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Tax { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Discount { get; set; }

    }
}
