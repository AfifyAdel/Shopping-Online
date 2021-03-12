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
        private readonly OSDataContext _db;
        public DiscountRepositoy(OSDataContext context)
        {
            _db = context;
        }
        public void Delete(int id)
        {
            _db.Discounts.Remove(new Discount() { Id = id });
            _db.SaveChanges();
        }
       
        public async Task<Discount> GetByCode(string code)
        {
            return await _db.Discounts.FirstOrDefaultAsync(x => x.Code == code);
        }

        public async Task<Discount> GetById(int id)
        {
            return await _db.Discounts.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Discount>> GetDiscounts()
        {
            return await _db.Discounts.ToListAsync();
        }

        public async Task<bool> Insert(Discount discount)
        {
            await _db.Discounts.AddAsync(discount);
            await _db.SaveChangesAsync();
            return true;
        }

        public void Update(Discount discount)
        {
            _db.Discounts.Update(discount);
            _db.SaveChanges();
        }

    }
}
