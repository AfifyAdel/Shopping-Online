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
        public async Task<List<OrderDetail>> GetOrderItems(long orderId)
        {
            using (var context = new OSDataContext())
            {
                return await context.OrdersDetails.Where(x => x.OrderId == orderId).ToListAsync();
            }
        }

        public async Task<bool> Insert(OrderDetail orderDetail)
        {
            using (var context = new OSDataContext())
            {
                await context.AddAsync<OrderDetail>(orderDetail);
                await context.SaveChangesAsync();
                return true;
            }
        }
    }
}
