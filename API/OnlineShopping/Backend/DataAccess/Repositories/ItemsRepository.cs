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
        public ItemsRepository()
        {
        }
        public async Task<bool> DeleteAsync(long id)
        {
            var item = new Item()
            {
                Id = id
            };
            using (var context = new OSDataContext())
            {
                context.Remove<Item>(item);
                await context.SaveChangesAsync();
            }
            return true;
        }

        public async Task<Item> GetByID(long id)
        {
            using (var context = new OSDataContext())
            {
                return await context.Items.FirstOrDefaultAsync(x => x.Id == id);
            }
        }

        public async Task<List<Item>> GetItems()
        {
            using (var context = new OSDataContext())
            {
                return await context.Items.ToListAsync();
            }
        }

        public async Task<bool> Insert(Item item)
        {
            using (var context = new OSDataContext())
            {
                await context.AddAsync(item);
                await context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> Update(Item item)
        {
            using (var context = new OSDataContext())
            {
                context.Update<Item>(item);
                await context.SaveChangesAsync();
                return true;
            }
        }
    }
}
