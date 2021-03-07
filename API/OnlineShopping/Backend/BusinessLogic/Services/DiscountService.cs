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
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepositoy discountRepository;

        public DiscountService(IDiscountRepositoy discountRepository)
        {
            this.discountRepository = discountRepository;
        }
        public async Task<GeneralResponse<bool>> AddDiscount(Discount discount)
        {
            try
            {
                var result = await discountRepository.Insert(discount);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GeneralResponse<bool>> DeleteDiscount(int id)
        {
            try
            {
                var result = await discountRepository.Delete(id);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GeneralResponse<Discount>> GetDiscountByCode(string code)
        {
            var discount = await discountRepository.GetByCode(code);
            return new GeneralResponse<Discount>(discount);
        }

        public async Task<GeneralResponse<List<Discount>>> GetDiscounts()
        {
            var discounts = await discountRepository.GetDiscounts();
            return new GeneralResponse<List<Discount>>(discounts);
        }
    }
}
