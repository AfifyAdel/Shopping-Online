using DataAccess.Context;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class OrderDetailsRepository : IOrderDetailsRepository
    {
        private readonly OSDataContext _db;
        public OrderDetailsRepository(OSDataContext context)
        {
            _db = context;
        }
        public async Task<List<OrderDetail>> GetOrderItems(long orderId)
        {
            return await _db.OrdersDetails.Where(x => x.OrderId == orderId).ToListAsync();
        }

        public async Task<bool> Insert(OrderDetail orderDetail)
        {
            await _db.OrdersDetails.AddAsync(orderDetail);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
