using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Constants.URLs;
using Domain.Entities;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShoppingAPIs.Controllers
{
    [Authorize]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }
        [Route(CategoryURLs.GetCategories)]
        [HttpGet]
        public async Task<GeneralResponse<List<Category>>> GetCategorys()
        {
            try
            {
                var response = await categoryService.GetCategories();
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<List<Category>>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Authorize(Roles = "1")]
        [Route(CategoryURLs.AddCategory)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> AddCategory([FromBody] Category Category)
        {
            try
            {
                var response = await categoryService.AddCategory(Category);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Authorize(Roles = "1")]
        [Route(CategoryURLs.DeleteCategory)]
        [HttpPost]
        public GeneralResponse<bool> DeleteCategory([FromBody] int id)
        {
            try
            {
                return categoryService.DeleteCategory(id);
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(CategoryURLs.GetCategoryByName)]
        [HttpGet]
        public async Task<GeneralResponse<Category>> GetCategoryByName(string name)
        {
            try
            {
                var response = await categoryService.GetCategoryByName(name);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<Category>(ex.Message, EResponseStatus.Exception);
            }
        }
    }
}
