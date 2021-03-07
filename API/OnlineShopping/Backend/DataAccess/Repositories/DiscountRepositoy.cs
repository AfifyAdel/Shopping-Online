using DataAccess.Context;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class DiscountRepositoy : IDiscountRepositoy
    {
        public async Task<bool> Delete(int id)
        {
            var discount = new Discount()
            {
                Id = id
            };
            using (var context = new OSDataContext())
            {
                context.Remove<Discount>(discount);
                await context.SaveChangesAsync();
            }
            return true;
        }

        public async Task<Discount> GetByCode(string code)
        {
            using (var context = new OSDataContext())
            {
                return await context.Discounts.FirstOrDefaultAsync(x => x.Code == code);
            }
        }

        public async Task<List<Discount>> GetDiscounts()
        {
            using (var context = new OSDataContext())
            {
                return await context.Discounts.ToListAsync();
            }
        }

        public async Task<bool> Insert(Discount discount)
        {
            using (var context = new OSDataContext())
            {
                await context.AddAsync<Discount>(discount);
                await context.SaveChangesAsync();
                return true;
            }
        }
    }
}
