using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByID(long id);
        Task<User> GetByUsername(string username);
        Task<User> GetByEmail(string email);
        Task<List<User>> GetUsers();
        Task<bool> Insert(User user, string password);
        Task<bool> Update(User user);
        Task<bool> Delete(long id);
    }
}
