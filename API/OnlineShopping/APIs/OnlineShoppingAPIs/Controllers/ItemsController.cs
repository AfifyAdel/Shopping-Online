﻿using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Constants.URLs;
using Domain.Entities;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShoppingAPIs.Controllers
{
    [Authorize]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsService itemsService;
        public ItemsController(IItemsService itemsService)
        {
            this.itemsService = itemsService;
        }
        [Route(ItemsURLs.GetItems)]
        [HttpGet]
        public async Task<GeneralResponse<List<Item>>> GetItems()
        {
            try
            {
                var response = await itemsService.GetItems();
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<List<Item>>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(ItemsURLs.AddItem)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> AddItem()
        {
            try
            {
                var newItem = new Item()
                {
                    Id = Convert.ToInt64(Request.Form["id"].ToString()),
                    Name = Request.Form["name"].ToString(),
                    Quantity = Convert.ToInt32(Request.Form["quantity"].ToString()),
                    DiscountId = Convert.ToInt32(Request.Form["discountid"].ToString()),
                    Description = Request.Form["description"].ToString(),
                    TaxId = Convert.ToInt32(Request.Form["taxid"].ToString()),
                    UOM = Convert.ToInt32(Request.Form["uom"].ToString()),
                };
                if (Request.Form.Files.Count > 0)
                    newItem.ImagePath = await SaveItemImage(Request.Form.Files[0], newItem.Id);
                else
                    newItem.ImagePath = Request.Form["imageUrl"].ToString();

                return await itemsService.AddItem(newItem);
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(ItemsURLs.UpdateItem)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> UpdateItem()
        {
            try
            {
                var newItem = new Item()
                {
                    Id = Convert.ToInt64(Request.Form["id"].ToString()),
                    Name = Request.Form["name"].ToString(),
                    Quantity = Convert.ToInt32(Request.Form["quantity"].ToString()),
                    DiscountId = Convert.ToInt32(Request.Form["discountid"].ToString()),
                    Description = Request.Form["description"].ToString(),
                    TaxId = Convert.ToInt32(Request.Form["taxid"].ToString()),
                    UOM = Convert.ToInt32(Request.Form["uom"].ToString()),
                };
                if (Request.Form.Files.Count > 0)
                    newItem.ImagePath = await SaveItemImage(Request.Form.Files[0], newItem.Id);
                else
                    newItem.ImagePath = Request.Form["imageUrl"].ToString();

                return await itemsService.UpdateItem(newItem);
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(ItemsURLs.DeleteItem)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> DeleteItem([FromBody] long id)
        {
            try
            {
                var response = await itemsService.DeleteItem(id);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }

        private async Task<string> SaveItemImage(IFormFile formFile, long itemId)
        {
            try
            {
                string imagePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\ItemsImages");
                if (!Directory.Exists(imagePath))
                    Directory.CreateDirectory(imagePath);

                string filename =
                    DateTime.Now.ToString("yyyyMMdd_hhmmss") + "." + formFile.FileName.Split('.').Last();

                var filePath =
                    Path.Combine(imagePath, "Item_" + itemId.ToString());

                if (!Directory.Exists(filePath))
                    Directory.CreateDirectory(filePath);

                using (var stream = new FileStream(Path.Combine(filePath, filename), FileMode.Create))
                {
                    await formFile.CopyToAsync(stream);
                }
                return Path.Combine("Item_" + itemId.ToString(), filename);
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}