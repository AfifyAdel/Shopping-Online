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
        public UserRepository(OSDataContext context, UserManager<User> userManager)
        {
             _db = context;
            _userManager = userManager;
        }

        public async Task<User> GetByID(long id)
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

        public async Task<bool> Insert(User user,string password)
        {
            var res = await _userManager.CreateAsync(user, password);
            await _db.SaveChangesAsync();
            if (res.Succeeded) return true;
            else return false;
        }
        public async Task<bool> Update(User user)
        {
            var res = await _userManager.UpdateAsync(user);
            await _db.SaveChangesAsync();
            if (res.Succeeded) return true;
            else return false;
        }
        public async Task<bool> Delete(long id)
        {
            var res = await _userManager.DeleteAsync(new User() { Id = id});
            await _db.SaveChangesAsync();
            if (res.Succeeded) return true;
            else return false;
        }
    }
}
