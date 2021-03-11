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
        private readonly IDiscountRepositoy discountRepositoy;
        private readonly ITaxRepository taxRepository;
        private readonly IUOMRepository uomRepository;

        public ItemsService(IItemsRepository itemsRepository,IDiscountRepositoy discountRepositoy,
            ITaxRepository taxRepository,IUOMRepository uomRepository)
        {
            this.itemsRepository = itemsRepository;
            this.discountRepositoy = discountRepositoy;
            this.taxRepository = taxRepository;
            this.uomRepository = uomRepository;
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

        public async Task<GeneralResponse<Item>> GetItemById(long id)
        {
            var item = (await itemsRepository.GetItems()).FirstOrDefault(x=>x.Id==id);
            if (item != null)
            {
                return new GeneralResponse<Item>(item);
            }
            else
            {
                return new GeneralResponse<Item>("Cann't find this item!",EResponseStatus.Error);
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
                item.Discount = await discountRepositoy.GetById(item.DiscountId);
                item.Tax = await taxRepository.GetById(item.TaxId);
                item.UnitOfMeasure = await uomRepository.GetById(item.UOM);
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
