using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface ICategoryRepository
    {
        Task<Category> GetById(int id);
        Task<Category> GetByName(string name);
        Task<List<Category>> GetCategories();
        Task<bool> Insert(Category category);
        void Update(Category category);
        void Delete(int id);
    }
}
