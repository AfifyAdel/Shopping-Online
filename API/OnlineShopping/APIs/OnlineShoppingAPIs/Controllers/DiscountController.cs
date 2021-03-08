using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Constants.URLs;
using Domain.Entities;
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
    [Authorize]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService discountService;

        public DiscountController(IDiscountService discountService)
        {
            this.discountService = discountService;
        }
        [Route(DiscountURLs.GetDiscounts)]
        [HttpGet]
        public async Task<GeneralResponse<List<Discount>>> GetDiscounts()
        {
            try
            {
                var response = await discountService.GetDiscounts();
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<List<Discount>>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(DiscountURLs.AddDiscount)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> AddDiscount([FromBody] Discount discount)
        {
            try
            {
                var response = await discountService.AddDiscount(discount);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(DiscountURLs.DeleteDiscount)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> DeleteDiscount([FromBody] int id)
        {
            try
            {
                var response = await discountService.DeleteDiscount(id);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(DiscountURLs.GetDiscountByCode)]
        [HttpGet]
        public async Task<GeneralResponse<Discount>> GetDiscountByCode(string code)
        {
            try
            {
                var response = await discountService.GetDiscountByCode(code);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<Discount>(ex.Message, EResponseStatus.Exception);
            }
        }
    }
}
