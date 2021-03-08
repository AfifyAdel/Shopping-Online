using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Constants.URLs;
using Domain.Entities;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShoppingAPIs.Controllers
{
    [Authorize]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;

        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService;
        }

        [Route(OrderURLs.GetOrders)]
        [HttpGet]
        public async Task<GeneralResponse<List<Order>>> GetOrders()
        {
            try
            {
                var response = await orderService.GetOrders();
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<List<Order>>(ex.Message, EResponseStatus.Exception);
            }
        }

        [Route(OrderURLs.ChangeStatus)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> ChangeStatus([FromBody] OrderStatusModel model)
        {
            try
            {
                var response = await orderService.ChangeStatus(model);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }

        [Route(OrderURLs.GetCustomerOrders)]
        [HttpGet]
        public async Task<GeneralResponse<List<Order>>> GetCustomerOrders(string customerId)
        {
            try
            {
                var response = await orderService.GetCustomerOrders(customerId);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<List<Order>>(ex.Message, EResponseStatus.Exception);
            }
        }

        [Route(OrderURLs.GetOrderItems)]
        [HttpGet]
        public async Task<GeneralResponse<List<OrderDetail>>> GetOrderItems(long orderId)
        {
            try
            {
                var response = await orderService.GetOrderItems(orderId);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<List<OrderDetail>>(ex.Message, EResponseStatus.Exception);
            }
        }

        [Route(OrderURLs.Insert)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> Insert([FromBody] Order order)
        {
            try
            {
                var response = await orderService.Insert(order);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
    }
}
