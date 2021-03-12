using DataAccess.Context;
using Domain.Entities;
using Domain.Repositories;
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
        public UserRepository(OSDataContext context)
        {
             _db = context;
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

        public async Task<bool> Insert(User user)
        {
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
            return true;
        }
        public void Update(User user)
        {
            _db.Users.Update(user);
            _db.SaveChanges();
        }
        public void Delete(long id)
        {
            _db.Users.Remove(new User() { Id = id});
            _db.SaveChanges();
        }
    }
}
