using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUOMRepository
    {
        Task<UnitOfMeasure> GetByCode(string code);
        Task<List<UnitOfMeasure>> GetUOMs();
        Task<bool> Insert(UnitOfMeasure uom);
        Task<bool> Delete(int id);
    }
}
