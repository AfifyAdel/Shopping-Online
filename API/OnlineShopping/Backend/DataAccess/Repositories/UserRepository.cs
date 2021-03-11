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
        private readonly UserManager<User> _userManager;
        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<User> GetByID(string id)
        {
            using (var context = new OSDataContext())
            {
                return await context.Users.FirstOrDefaultAsync(x => x.Id == id);
            }
        }

        public async Task<User> GetByUsername(string username)
        {
            using (var context = new OSDataContext())
            {
                return await context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            }
        }
        public async Task<User> GetByEmail(string email)
        {
            using (var context = new OSDataContext())
            {
                return await context.Users.FirstOrDefaultAsync(x => x.Email == email);
            }
        }
        public async Task<List<User>> GetUsers()
        {
            using (var context = new OSDataContext())
            {
                return await context.Users.ToListAsync();
            }
        }

        public async Task<IdentityResult> Insert(User user,string password)
        {
            using (var context = new OSDataContext())
            {
                var res = await _userManager.CreateAsync(user, password);
                await context.SaveChangesAsync();
                return res;
            }
        }
        
    }
}
