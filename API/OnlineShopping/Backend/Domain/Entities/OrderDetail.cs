﻿using System;
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
        public long OrderId { get; set; }
        public Order Order { get; set; }
        public long ItemId { get; set; }
        public decimal ItemPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public int UOM { get; set; }
        public int Tax { get; set; }
        public int Discount { get; set; }

    }
}
