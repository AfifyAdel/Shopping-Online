using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Entities;
using Domain.Repositories;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class TaxesService : ITaxesService
    {
        private readonly ITaxRepository taxRepository;

        public TaxesService(ITaxRepository taxRepository)
        {
            this.taxRepository = taxRepository;
        }
        public async Task<GeneralResponse<bool>> AddTax(Tax tax)
        {
            try
            {
                //Check if code already exist
                var taxDB = await taxRepository.GetByCode(tax.Code);
                if (taxDB != null)
                {
                    return new GeneralResponse<bool>("This tax code already exist",EResponseStatus.Error);
                }
                await taxRepository.Insert(tax);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while adding new tax", ex);
            }
        }

        public GeneralResponse<bool> DeleteTax(int id)
        {
            try
            {
                taxRepository.Delete(id);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while deleting new tax", ex);
            }
        }

        public async Task<GeneralResponse<Tax>> GetTaxByCode(string code)
        {
            var tax = await taxRepository.GetByCode(code);
            return new GeneralResponse<Tax>(tax);
        }

        public async Task<GeneralResponse<List<Tax>>> GetTaxes()
        {
            var taxes = await taxRepository.GetTaxes();
            return new GeneralResponse<List<Tax>>(taxes);
        }
    }
}
