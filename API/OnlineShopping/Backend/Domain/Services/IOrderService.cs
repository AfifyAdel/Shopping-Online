using Domain.Communication;
using Domain.Entities;
using Domain.Models;
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
        Task<GeneralResponse<List<Order>>> GetCustomerOrders(long customerId);
        Task<GeneralResponse<bool>> Insert(Order order);
        GeneralResponse<bool> Update(Order order);
    }
}
