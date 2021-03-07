using Domain.Communication;
using Domain.Entities;
using Domain.Repositories;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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
                var result = await itemsRepository.Insert(item);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GeneralResponse<bool>> DeleteItem(long id)
        {
            try
            {
                var result = await itemsRepository.DeleteAsync(id);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GeneralResponse<List<Item>>> GetItems()
        {
            var items = await itemsRepository.GetItems();
            return new GeneralResponse<List<Item>>(items);
        }

        public async Task<GeneralResponse<bool>> UpdateItem(Item item)
        {
            try
            {
                var result = await itemsRepository.Update(item);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
