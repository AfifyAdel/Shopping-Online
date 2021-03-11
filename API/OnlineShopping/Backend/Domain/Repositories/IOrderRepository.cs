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
        Task ChangeStatus(long orderId,int orderStatus);
        Task<bool> Insert(Order order);
        Task<bool> Update(Order order);
        Task<List<Order>> GetCustomerOrders(string customerId);
    }
}
