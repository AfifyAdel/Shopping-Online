using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByID(string id);
        Task<User> GetByUsername(string username);
        Task<User> GetByEmail(string email);
        Task<List<User>> GetUsers();
        Task<IdentityResult> Insert(User user, string password);
    }
}
