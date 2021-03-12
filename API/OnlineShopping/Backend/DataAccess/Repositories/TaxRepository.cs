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
    public class TaxRepository : ITaxRepository
    {
        private readonly OSDataContext _db;
        public TaxRepository(OSDataContext context)
        {
            _db = context;
        }
        public void Delete(int id)
        {
            _db.Taxes.Remove(new Tax() { Id = id });
            _db.SaveChanges();
        }
       
        public async Task<Tax> GetByCode(string code)
        {
            return await _db.Taxes.FirstOrDefaultAsync(x => x.Code == code);
        }

        public async Task<Tax> GetById(int id)
        {
            return await _db.Taxes.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Tax>> GetTaxes()
        {
            return await _db.Taxes.ToListAsync();
        }

        public async Task<bool> Insert(Tax tax)
        {
            await _db.Taxes.AddAsync(tax);
            await _db.SaveChangesAsync();
            return true;
        }

        public void Update(Tax tax)
        {
            _db.Taxes.Update(tax);
            _db.SaveChanges();
        }     
    }
}
