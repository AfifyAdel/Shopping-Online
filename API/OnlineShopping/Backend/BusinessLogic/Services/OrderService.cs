using Domain.Communication;
using Domain.Entities;
using Domain.Models;
using Domain.Repositories;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository orderRepository;
        private readonly IOrderDetailsRepository orderDetailsRepository;
        private readonly IItemsRepository itemsRepository;

        public OrderService(IOrderRepository orderRepository , IOrderDetailsRepository orderDetailsRepository , 
            IItemsRepository itemsRepository)
        {
            this.orderRepository = orderRepository;
            this.orderDetailsRepository = orderDetailsRepository;
            this.itemsRepository = itemsRepository;
        }

        public async Task<GeneralResponse<List<Order>>> GetCustomerOrders(long customerId)
        {
            var orders = await orderRepository.GetCustomerOrders(customerId);
            return new GeneralResponse<List<Order>>(orders);
        }

        public async Task<GeneralResponse<List<OrderDetail>>> GetOrderItems(long orderId)
        {
            var items = await orderDetailsRepository.GetOrderItems(orderId);
            return new GeneralResponse<List<OrderDetail>>(items.Distinct().ToList());
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
                var result = await orderRepository.Insert(order);
                foreach (var item in order.OrderDetails)
                {
                    item.OrderId = result;
                    var product = await itemsRepository.GetByID(item.ItemId);
                    if (product.Quantity - item.Quantity < 0)
                        continue;
                    product.Quantity -= item.Quantity;
                    itemsRepository.Update(product);
                    await orderDetailsRepository.Insert(item);
                }
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while adding new order", ex);
            }
        }

        public GeneralResponse<bool> Update(Order order)
        {
            try
            {
                orderRepository.Update(order);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while updating order", ex);
            }
        }
    }
}
