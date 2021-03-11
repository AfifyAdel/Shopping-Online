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
    public class OrderRepository : IOrderRepository
    {
        public async Task ChangeStatus(long orderId, int orderStatus)
        {
            using (var context = new OSDataContext())
            {
                 (await context.Orders.FirstOrDefaultAsync(x => x.Id == orderId)).Status = orderStatus;
            }
        }

        public async Task<List<Order>> GetCustomerOrders(string customerId)
        {
            using (var context = new OSDataContext())
            {
                return await context.Orders.Where(x => x.CustomerId == customerId).ToListAsync();
            }
        }

        public async Task<List<Order>> GetOrders()
        {
            using (var context = new OSDataContext())
            {
                return await context.Orders.ToListAsync();
            }
        }

        public async Task<bool> Insert(Order order)
        {
            using (var context = new OSDataContext())
            {
                await context.Orders.AddAsync(order);
                await context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> Update(Order order)
        {
            using (var context = new OSDataContext())
            {
                context.Orders.Update(order);
                await context.SaveChangesAsync();
                return true;
            }
        }
    }
}
