using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUomRepository
    {
        Task<UnitOfMeasure> GetById(int id);
        Task<UnitOfMeasure> GetByCode(string code);
        Task<List<UnitOfMeasure>> GetUOMs();
        Task<bool> Insert(UnitOfMeasure uom);
        void Delete(int id);
        void Update(UnitOfMeasure uom);
    }
}
