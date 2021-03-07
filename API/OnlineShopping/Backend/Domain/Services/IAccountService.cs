﻿using Domain.Communication;
using Domain.Entities;
using Domain.Models.AccountModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface IAccountService
    {
        Task<GeneralResponse<bool>> Register(RegisterModel registerModel);
        Task<GeneralResponse<AuthModel>> Login(LoginModel loginModel);
    }
}
