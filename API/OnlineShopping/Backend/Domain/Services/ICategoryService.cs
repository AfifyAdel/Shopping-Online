using Domain.Communication;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface ICategoryService
    {
        Task<GeneralResponse<List<Category>>> GetCategories();
        Task<GeneralResponse<Category>> GetCategoryByName(string name);
        Task<GeneralResponse<bool>> AddCategory(Category category);
        GeneralResponse<bool> DeleteCategory(int id);
    }
}
