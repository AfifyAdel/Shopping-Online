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
    public class UOMRepository : IUOMRepository
    {
        public async Task<bool> Delete(int id)
        {
            var unitOfMeasure = new UnitOfMeasure()
            {
                Id = id
            };
            using (var context = new OSDataContext())
            {
                context.Remove<UnitOfMeasure>(unitOfMeasure);
                await context.SaveChangesAsync();
            }
            return true;
        }

        public async Task<UnitOfMeasure> GetByCode(string code)
        {
            using (var context = new OSDataContext())
            {
                return await context.UnitOfMeasures.FirstOrDefaultAsync(x => x.UOM == code);
            }
        }

        public async Task<UnitOfMeasure> GetById(int id)
        {
            using (var context = new OSDataContext())
            {
                return await context.UnitOfMeasures.AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(x => x.Id == id);
            }
        }

        public async Task<List<UnitOfMeasure>> GetUOMs()
        {
            using (var context = new OSDataContext())
            {
                return await context.UnitOfMeasures.ToListAsync();
            }
        }

        public async Task<bool> Insert(UnitOfMeasure uom)
        {
            using (var context = new OSDataContext())
            {
                await context.AddAsync<UnitOfMeasure>(uom);
                await context.SaveChangesAsync();
                return true;
            }
        }
    }
}
