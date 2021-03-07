using Domain.Communication;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public interface ITaxesService
    {
        Task<GeneralResponse<List<Tax>>> GetTaxes();
        Task<GeneralResponse<Tax>> GetTaxByCode(string code);
        Task<GeneralResponse<bool>> AddTax(Tax tax);
        Task<GeneralResponse<bool>> DeleteTax(int id);
    }
}
