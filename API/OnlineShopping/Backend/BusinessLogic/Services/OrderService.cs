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
        public async Task<GeneralResponse<bool>> ChangeStatus(OrderStatusModel model)
        {
            try
            {
                await orderRepository.ChangeStatus(model.OrderId,model.OrderStatus);
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
                order.DiscountId = 1;
                order.TaxId = 1;
                var result = await orderRepository.Insert(order);
                var ord = (await orderRepository.GetOrders());
                foreach (var item in order.OrderDetails)
                {
                    item.OrderId = ord[ord.Count - 1].Id;
                    item.Order = null;
                    item.Id = 0;
                    var it = await itemsRepository.GetByID(item.ItemId);
                    it.Quantity -= item.Quantity;
                    await itemsRepository.Update(it);
                    await orderDetailsRepository.Insert(item);
                }
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GeneralResponse<bool>> Update(Order order)
        {
            try
            {
                order.DiscountId = 1;
                order.TaxId = 1;
                var result = await orderRepository.Update(order);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
