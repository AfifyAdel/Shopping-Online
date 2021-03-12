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
        private readonly OSDataContext _db;
        public OrderRepository(OSDataContext context)
        {
            _db = context;
        }

        public async Task<List<Order>> GetCustomerOrders(long customerId)
        {
            return await _db.Orders.Where(x => x.UserId == customerId).ToListAsync();
        }

        public async Task<List<Order>> GetOrders()
        {
            return await _db.Orders.ToListAsync();
        }

        public async Task<long> Insert(Order order)
        {
            await _db.Orders.AddAsync(order);
            await _db.SaveChangesAsync();
            return order.Id;
        }

        public void Update(Order order)
        {
            _db.Orders.Update(order);
            _db.SaveChanges();
        }
    }
}
