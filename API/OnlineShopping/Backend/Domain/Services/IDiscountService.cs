using Domain.Communication;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface IDiscountService
    {
        Task<GeneralResponse<List<Discount>>> GetDiscounts();
        Task<GeneralResponse<Discount>> GetDiscountByCode(string code);
        Task<GeneralResponse<bool>> AddDiscount(Discount discount);
        GeneralResponse<bool> DeleteDiscount(int id);
    }
}
