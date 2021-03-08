﻿using Domain.Communication;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface IItemsService
    {
        Task<GeneralResponse<List<Item>>> GetItems();
        Task<GeneralResponse<bool>> AddItem(Item item);
        Task<GeneralResponse<bool>> UpdateItem(Item item);
        Task<GeneralResponse<bool>> DeleteItem(long id);
    }
}