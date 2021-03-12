using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Constants.URLs
{
    public static class OrderURLs
    {
        public const string GetOrders = "api/Order/GetOrders";
        public const string GetOrderItems = "api/Order/GetOrderItems/{orderId}";
        public const string GetCustomerOrders = "api/Order/GetCustomerOrders/{customerId}";
        public const string ChangeStatus = "api/Order/ChangeStatus";
        public const string Insert = "api/Order/Insert";
        public const string Update = "api/Order/Update";
    }
}
