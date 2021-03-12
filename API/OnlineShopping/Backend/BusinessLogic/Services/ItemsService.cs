using Domain.Communication;
using Domain.Entities;
using Domain.Repositories;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Domain.Constants.Enums;

namespace BusinessLogic.Services
{
    public class ItemsService : IItemsService
    {
        private readonly IItemsRepository itemsRepository;

        public ItemsService(IItemsRepository itemsRepository)
        {
            this.itemsRepository = itemsRepository;
        }
        public async Task<GeneralResponse<bool>> AddItem(Item item)
        {
            try
            {
                await itemsRepository.Insert(item);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while adding new item", ex);
            }
        }

        public GeneralResponse<bool> DeleteItem(long id)
        {
            try
            {
                itemsRepository.Delete(id);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while deleting item", ex);
            }
        }

        public async Task<GeneralResponse<Item>> GetItemById(long id)
        {
            var item = (await itemsRepository.GetItems()).FirstOrDefault(x=>x.Id==id);
            if (item != null)
            {
                return new GeneralResponse<Item>(item);
            }
            else
            {
                return new GeneralResponse<Item>("Can not find this item!",EResponseStatus.Error);
            }
        }

        public async Task<GeneralResponse<List<Item>>> GetItems()
        {
            var items = await itemsRepository.GetItems();
            return new GeneralResponse<List<Item>>(items);
        }

        public GeneralResponse<bool> UpdateItem(Item item)
        {
            try
            {
                itemsRepository.Update(item);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while updating item", ex);
            }
        }
    }
}
