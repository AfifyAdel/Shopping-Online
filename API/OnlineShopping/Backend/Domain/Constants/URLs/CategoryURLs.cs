using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Constants.URLs
{
    public static class CategoryURLs
    {
        public const string GetCategories = "api/Category/GetCategories";
        public const string GetCategoryByName = "api/Category/GetCategoryByName/{name}";
        public const string AddCategory = "api/Category/AddCategory";
        public const string DeleteCategory = "api/Category/DeleteCategory";
    }
}
