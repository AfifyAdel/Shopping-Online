using Domain.Communication;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface IUOMService
    {
        Task<GeneralResponse<List<UnitOfMeasure>>> GetUOMs();
        Task<GeneralResponse<UnitOfMeasure>> GetUOMByCode(string code);
        Task<GeneralResponse<bool>> AddUOM(UnitOfMeasure uom);
        Task<GeneralResponse<bool>> DeleteUOM(int id);
    }
}
