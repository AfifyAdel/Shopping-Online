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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly OSDataContext _db;
        public CategoryRepository(OSDataContext context)
        {
            _db = context;
        }
        public void Delete(int id)
        {
            _db.Categories.Remove(new Category() { Id = id });
            _db.SaveChanges();
        }

        public async Task<Category> GetById(int id)
        {
            return await _db.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Category> GetByName(string name)
        {
            return await _db.Categories.FirstOrDefaultAsync(x => x.Name == name);
        }

        public async Task<List<Category>> GetCategories()
        {
            return await _db.Categories.ToListAsync();
        }

        public async Task<bool> Insert(Category category)
        {
            await _db.Categories.AddAsync(category);
            await _db.SaveChangesAsync();
            return true;
        }

        public void Update(Category category)
        {
            _db.Categories.Update(category);
            _db.SaveChanges();
        }
    }
}
