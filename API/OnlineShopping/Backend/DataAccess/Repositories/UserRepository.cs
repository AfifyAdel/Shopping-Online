using DataAccess.Context;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly OSDataContext _db;
        private readonly UserManager<User> _userManager;
        public UserRepository(OSDataContext db, UserManager<User> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        public async Task<User> GetByID(string id)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User> GetByUsername(string username)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.UserName == username);
        }
        public async Task<User> GetByEmail(string email)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
        public async Task<List<User>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task<IdentityResult> Insert(User user,string password)
        {
            var res= await _userManager.CreateAsync(user, password);
            await _db.SaveChangesAsync();
            return res;
        }

        public async Task<bool> IsUserInRole(User user,string role)
        {
           return await _userManager.IsInRoleAsync(user, role);
        }

        public async Task<bool> AddUserToRole(User user, string role)
        {
            await _userManager.AddToRoleAsync(user, role);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<string> GetUserRole(string id)
        {
            var userRole = await _db.UserRoles.FirstOrDefaultAsync(x => x.UserId == id);

            if (userRole != null)
                return await _db.Roles.Where(x => x.Id == userRole.RoleId).Select(g => g.Name).FirstOrDefaultAsync();

            return null;
        }
    }
}
