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
        public async Task<bool> Delete(int id)
        {
            var tax = new Tax()
            {
                Id = id
            };
            using (var context = new OSDataContext())
            {
                context.Remove<Tax>(tax);
                await context.SaveChangesAsync();
            }
            return true;
        }

        public async Task<Tax> GetByCode(string code)
        {
            using (var context = new OSDataContext())
            {
                return await context.Taxes.FirstOrDefaultAsync(x => x.Code == code);
            }
        }

        public async Task<Tax> GetById(int id)
        {
            using (var context = new OSDataContext())
            {
                return await context.Taxes.FirstOrDefaultAsync(x => x.Id == id);
            }
        }

        public async Task<List<Tax>> GetTaxes()
        {
            using (var context = new OSDataContext())
            {
                return await context.Taxes.ToListAsync();
            }
        }

        public async Task<bool> Insert(Tax tax)
        {
            using (var context = new OSDataContext())
            {
                await context.AddAsync<Tax>(tax);
                await context.SaveChangesAsync();
                return true;
            }
        }
    }
}
