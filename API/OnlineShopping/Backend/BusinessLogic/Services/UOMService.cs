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
    public class UomService : IUomService
    {
        private readonly IUomRepository uomRepository;

        public UomService(IUomRepository uomRepository)
        {
            this.uomRepository = uomRepository;
        }
        public async Task<GeneralResponse<bool>> AddUOM(UnitOfMeasure uom)
        {
            try
            {
                //Check if code already exist
                var uomDB = await uomRepository.GetByCode(uom.UOM);
                if (uomDB != null)
                {
                    return new GeneralResponse<bool>("This unit of measure already exist", EResponseStatus.Error);
                }
                await uomRepository.Insert(uom);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while adding new unit of measure", ex);
            }
        }

        public GeneralResponse<bool> DeleteUOM(int id)
        {
            try
            {
                uomRepository.Delete(id);
                return new GeneralResponse<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while deleting unit of measure", ex);
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
