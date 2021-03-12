using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IDiscountRepositoy
    {
        Task<Discount> GetById(int id);
        Task<Discount> GetByCode(string code);
        Task<List<Discount>> GetDiscounts();
        Task<bool> Insert(Discount discount);
        void Update(Discount discount);
        void Delete(int id);
    }
}
