using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IOrderDetailsRepository
    {
        Task<List<OrderDetail>> GetOrderItems(long orderId);
        Task<bool> Insert(OrderDetail orderDetail);
    }
}
