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
    public class ItemsRepository : IItemsRepository
    {
        private readonly OSDataContext _db;
        public ItemsRepository(OSDataContext context)
        {
            _db = context;
        }

        public void Delete(long id)
        {
            _db.Items.Remove(new Item() {Id =id });
            _db.SaveChanges();
        }

        public async Task<Item> GetByID(long id)
        {
            return await _db.Items.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Item>> GetItems()
        {
            return await _db.Items.ToListAsync();
        }

        public async Task<bool> Insert(Item item)
        {
            await _db.Items.AddAsync(item);
            await _db.SaveChangesAsync();
            return true;
        }
        public void Update(Item item)
        {
            _db.Items.Update(item);
            _db.SaveChanges();
        }
    }
}
