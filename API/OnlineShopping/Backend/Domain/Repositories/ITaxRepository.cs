using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface ITaxRepository
    {
        Task<Tax> GetById(int id);
        Task<Tax> GetByCode(string code);
        Task<List<Tax>> GetTaxes();
        Task<bool> Insert(Tax tax);
        void Update(Tax tax);
        void Delete(int id);
    }
}
