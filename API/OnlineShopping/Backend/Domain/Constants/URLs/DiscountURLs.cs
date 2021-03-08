using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Constants.URLs
{
    public abstract class DiscountURLs
    {
        public const string GetDiscounts = "api/Discount/GetDiscounts";
        public const string GetDiscountByCode = "api/Discount/GetDiscountByCode/{code}";
        public const string AddDiscount = "api/Discount/AddDiscount";
        public const string DeleteDiscount = "api/Discount/DeleteDiscount";
    }
}
