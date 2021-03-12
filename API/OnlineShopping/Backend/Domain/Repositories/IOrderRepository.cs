using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrders();
        Task<long> Insert(Order order);
        void Update(Order order);
        Task<List<Order>> GetCustomerOrders(long customerId);
    }
}
