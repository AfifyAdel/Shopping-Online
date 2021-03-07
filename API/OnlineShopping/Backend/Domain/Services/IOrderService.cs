using Domain.Communication;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface IOrderService
    {
        Task<GeneralResponse<List<Order>>> GetOrders();
        Task<GeneralResponse<List<OrderDetail>>> GetOrderItems(long orderId);
        Task<GeneralResponse<List<Order>>> GetCustomerOrders(string customerId);
        Task<GeneralResponse<bool>> ChangeStatus(long orderId, int orderStatus);
        Task<GeneralResponse<bool>> Insert(Order order);
    }
}
