using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IItemsRepository
    {
        Task<Item> GetByID(long id);
        Task<List<Item>> GetItems();
        Task<bool> Insert(Item item);
        Task<bool> Update(Item item);
        Task<bool> DeleteAsync(long id);
    }
}
