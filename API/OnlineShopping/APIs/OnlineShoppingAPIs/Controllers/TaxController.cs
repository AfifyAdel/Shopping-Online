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
    [ApiController]
    public class TaxController : ControllerBase
    {
        private readonly ITaxesService taxService;

        public TaxController(ITaxesService taxService)
        {
            this.taxService = taxService;
        }

        [Route(TaxesURLs.GetTaxes)]
        [HttpGet]
        public async Task<GeneralResponse<List<Tax>>> GetTaxes()
        {
            try
            {
                var response = await taxService.GetTaxes();
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<List<Tax>>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(TaxesURLs.AddTax)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> AddTax([FromBody] Tax tax)
        {
            try
            {
                var response = await taxService.AddTax(tax);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(TaxesURLs.DeleteTax)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> DeleteTax([FromBody] int id)
        {
            try
            {
                var response = await taxService.DeleteTax(id);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(TaxesURLs.GetTaxByCode)]
        [HttpGet]
        public async Task<GeneralResponse<Tax>> GetTaxByCode(string code)
        {
            try
            {
                var response = await taxService.GetTaxByCode(code);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<Tax>(ex.Message, EResponseStatus.Exception);
            }
        }
    }
}
