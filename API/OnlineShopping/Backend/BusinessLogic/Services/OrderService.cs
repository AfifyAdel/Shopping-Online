using Domain.Communication;
using Domain.Entities;
using Domain.Repositories;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository orderRepository;
        private readonly IOrderDetailsRepository orderDetailsRepository;

        public OrderService(IOrderRepository orderRepository , IOrderDetailsRepository orderDetailsRepository)
        {
            this.orderRepository = orderRepository;
            this.orderDetailsRepository = orderDetailsRepository;
        }
        public async Task<GeneralResponse<bool>> ChangeStatus(long orderId, int orderStatus)
        {
            try
            {
                await orderRepository.ChangeStatus(orderId,orderStatus);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GeneralResponse<List<Order>>> GetCustomerOrders(string customerId)
        {
            var orders = await orderRepository.GetCustomerOrders(customerId);
            return new GeneralResponse<List<Order>>(orders);
        }

        public async Task<GeneralResponse<List<OrderDetail>>> GetOrderItems(long orderId)
        {
            var items = await orderDetailsRepository.GetOrderItems(orderId);
            return new GeneralResponse<List<OrderDetail>>(items);
        }

        public async Task<GeneralResponse<List<Order>>> GetOrders()
        {
            var orders = await orderRepository.GetOrders();
            return new GeneralResponse<List<Order>>(orders);
        }

        public async Task<GeneralResponse<bool>> Insert(Order order)
        {
            try
            {
                foreach (var item in order.OrderDetails)
                {
                    await orderDetailsRepository.Insert(item);
                }
                var result = await orderRepository.Insert(order);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
