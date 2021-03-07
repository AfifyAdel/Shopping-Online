using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IDiscountRepositoy
    {
        Task<Discount> GetByCode(string code);
        Task<List<Discount>> GetDiscounts();
        Task<bool> Insert(Discount discount);
        Task<bool> Delete(int id);
    }
}
