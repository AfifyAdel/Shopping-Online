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
        Task<string> GetUserRole(string id);
        Task<bool> IsUserInRole(User user, string role);
        Task<bool> AddUserToRole(User user, string role);
        Task<User> GetByEmail(string email);
        Task<List<User>> GetUsers();
        Task<IdentityResult> Insert(User user, string password);
    }
}
