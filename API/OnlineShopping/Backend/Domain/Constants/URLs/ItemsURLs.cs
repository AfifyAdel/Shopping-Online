using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Constants.URLs
{
    public static class ItemsURLs
    {
        public const string GetItems = "api/Items/GetItems";
        public const string AddItem = "api/Items/AddItem";
        public const string UpdateItem = "api/Items/UpdateItem";
        public const string DeleteItem = "api/Items/DeleteItem";
        public const string GetItemById = "api/Items/GetItemById/{id}";
    }
}
