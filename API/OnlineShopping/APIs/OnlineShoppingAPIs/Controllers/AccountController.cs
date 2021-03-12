using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Constants.URLs;
using Domain.Entities;
using Domain.Models.AccountModels;
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
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [Route(AccountURLs.Login)]
        [HttpPost]
        public async Task<GeneralResponse<User>> Login([FromBody] LoginModel model)
        {
            try
            {
                var response = await _accountService.Login(model);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<User>(ex.Message, EResponseStatus.Exception);
            }
        }

        [Route(AccountURLs.Register)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> Register([FromBody] User user)
        {
            try
            {
                var response = await _accountService.Register(user);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
    }
}
