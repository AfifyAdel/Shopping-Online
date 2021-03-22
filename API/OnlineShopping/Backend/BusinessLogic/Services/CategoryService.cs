using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Entities;
using Domain.Repositories;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }
        public async Task<GeneralResponse<bool>> AddCategory(Category category)
        {
            try
            {
                //Check if name already exist
                var categoryDB = await categoryRepository.GetByName(category.Name);
                if (categoryDB != null)
                {
                    return new GeneralResponse<bool>("This category name already exist", EResponseStatus.Error);
                }
                await categoryRepository.Insert(category);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while adding new category", ex);
            }
        }

        public GeneralResponse<bool> DeleteCategory(int id)
        {
            try
            {
                categoryRepository.Delete(id);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while deleting category", ex);
            }
        }

        public async Task<GeneralResponse<List<Category>>> GetCategories()
        {
            var categories = await categoryRepository.GetCategories();
            return new GeneralResponse<List<Category>>(categories);
        }

        public async Task<GeneralResponse<Category>> GetCategoryByName(string name)
        {
            var category = await categoryRepository.GetByName(name);
            return new GeneralResponse<Category>(category);
        }
    }
}
