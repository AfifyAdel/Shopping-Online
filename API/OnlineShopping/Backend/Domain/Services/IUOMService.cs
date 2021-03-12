using Domain.Communication;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface IUomService
    {
        Task<GeneralResponse<List<UnitOfMeasure>>> GetUOMs();
        Task<GeneralResponse<UnitOfMeasure>> GetUOMByCode(string code);
        Task<GeneralResponse<bool>> AddUOM(UnitOfMeasure uom);
        GeneralResponse<bool> DeleteUOM(int id);
    }
}
