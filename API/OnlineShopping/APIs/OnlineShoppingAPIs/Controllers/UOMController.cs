using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Constants.URLs;
using Domain.Entities;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShoppingAPIs.Controllers
{
    [ApiController]
    public class UOMController : ControllerBase
    {
        private readonly IUOMService uomService;

        public UOMController(IUOMService uomService)
        {
            this.uomService = uomService;
        }

        [Route(UOMURLs.GetUOMs)]
        [HttpGet]
        public async Task<GeneralResponse<List<UnitOfMeasure>>> GetUOMs()
        {
            try
            {
                var response = await uomService.GetUOMs();
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<List<UnitOfMeasure>>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(UOMURLs.AddUOM)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> AddUOM([FromBody] UnitOfMeasure uom)
        {
            try
            {
                var response = await uomService.AddUOM(uom);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(UOMURLs.DeleteUOM)]
        [HttpPost]
        public async Task<GeneralResponse<bool>> DeleteUOM([FromBody] int id)
        {
            try
            {
                var response = await uomService.DeleteUOM(id);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<bool>(ex.Message, EResponseStatus.Exception);
            }
        }
        [Route(UOMURLs.GetUOMByCode)]
        [HttpGet]
        public async Task<GeneralResponse<UnitOfMeasure>> GetUOMByCode(string code)
        {
            try
            {
                var response = await uomService.GetUOMByCode(code);
                return response;
            }
            catch (Exception ex)
            {
                return new GeneralResponse<UnitOfMeasure>(ex.Message, EResponseStatus.Exception);
            }
        }
    }
}
