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
    public class UomRepository : IUomRepository
    {
        private readonly OSDataContext _db;
        public UomRepository(OSDataContext context)
        {
            _db = context;
        }
        public void Delete(int id)
        {
            _db.UnitOfMeasures.Remove(new UnitOfMeasure() { Id = id });
            _db.SaveChanges();
        }

        public async Task<UnitOfMeasure> GetByCode(string code)
        {
            return await _db.UnitOfMeasures.FirstOrDefaultAsync(x => x.UOM == code);
        }

        public async Task<UnitOfMeasure> GetById(int id)
        {
            return await _db.UnitOfMeasures.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<UnitOfMeasure>> GetUOMs()
        {
            return await _db.UnitOfMeasures.ToListAsync();
        }

        public async Task<bool> Insert(UnitOfMeasure uom)
        {
            await _db.UnitOfMeasures.AddAsync(uom);
            await _db.SaveChangesAsync();
            return true;
        }

        public void Update(UnitOfMeasure uom)
        {
            _db.UnitOfMeasures.Update(uom);
            _db.SaveChanges();
        }
    }
}
