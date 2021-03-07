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
    public class UOMService : IUOMService
    {
        private readonly IUOMRepository uomRepository;

        public UOMService(IUOMRepository uomRepository)
        {
            this.uomRepository = uomRepository;
        }
        public async Task<GeneralResponse<bool>> AddUOM(UnitOfMeasure uom)
        {
            try
            {
                var result = await uomRepository.Insert(uom);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GeneralResponse<bool>> DeleteUOM(int id)
        {
            try
            {
                var result = await uomRepository.Delete(id);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GeneralResponse<UnitOfMeasure>> GetUOMByCode(string code)
        {
            var uom = await uomRepository.GetByCode(code);
            return new GeneralResponse<UnitOfMeasure>(uom);
        }

        public async Task<GeneralResponse<List<UnitOfMeasure>>> GetUOMs()
        {
            var uoms = await uomRepository.GetUOMs();
            return new GeneralResponse<List<UnitOfMeasure>>(uoms);
        }
    }
}
