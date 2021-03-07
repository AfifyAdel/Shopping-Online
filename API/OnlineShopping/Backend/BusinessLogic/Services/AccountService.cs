using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Entities;
using Domain.Models.AccountModels;
using Domain.Repositories;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IHttpContextAccessor _contextAccessor;
        public AccountService(IUserRepository userRepository,
            SignInManager<User> signInManager, RoleManager<Role> roleManager,
             IHttpContextAccessor contextAccessor)
        {
            _userRepository = userRepository;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _contextAccessor = contextAccessor;
        }
        public async Task<GeneralResponse<AuthModel>> Login(LoginModel loginModel)
        {
            await CreateAdmin();
            var user = await _userRepository.GetByUsername(loginModel.UserName);

            if (user == null)
            {
                return new GeneralResponse<AuthModel>("Email or Password is not correct", EResponseStatus.Error);
            }

            var response = await _signInManager.PasswordSignInAsync(user, loginModel.Password, true, false);

            if (response.Succeeded)
            {
                if (await _roleManager.RoleExistsAsync(EUserRole.Admin.ToString()))
                    if (!await _userRepository.IsUserInRole(user, EUserRole.Customer.ToString()) && !await _userRepository.IsUserInRole(user, EUserRole.Admin.ToString()))
                        await _userRepository.AddUserToRole(user, EUserRole.Customer.ToString());

                var roleName = await _userRepository.GetUserRole(user.Id);
                var role = roleName == "Admin" ? EUserRole.Admin : EUserRole.Customer;
                var auth = new AuthModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                    Role = (int)role
                };
                return new GeneralResponse<AuthModel>(auth);
            }
            else
            {
                return new GeneralResponse<AuthModel>("Email or Password is not correct", EResponseStatus.Error);
            }
        }

        public async Task<GeneralResponse<bool>> Register(RegisterModel registerModel)
        {
            try
            {
                // Check if username exist
                var userDB = await _userRepository.GetByUsername(registerModel.UserName);
                if (userDB != null)
                {
                    return new GeneralResponse<bool>("Username already exists", EResponseStatus.Error);
                }

                // Check if email exist
                userDB = await _userRepository.GetByEmail(registerModel.Email);
                if (userDB != null)
                {
                    return new GeneralResponse<bool>("Email already exists", EResponseStatus.Error);
                }

                var newUser = new User()
                {
                    Email = registerModel.Email,
                    FirstName=registerModel.FirstName,
                    LastName=registerModel.LastName,
                    UserName = registerModel.UserName
                };
                
                var result = await _userRepository.Insert(newUser, registerModel.Password);

                if (result.Succeeded)
                {
                    return new GeneralResponse<bool>(true);
                }
                else
                {
                    return new GeneralResponse<bool>("Server Error", EResponseStatus.Error);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region Private Methods
        private async Task CreateAdmin()
        {
            try
            {
                var admin = await _userRepository.GetByUsername("Admin");
                if (admin == null)
                {
                    var newUser = new User()
                    {
                        UserName = "Admin",
                        Email = "Admin@Admin.com",
                        EmailConfirmed = true
                    };

                    var result = await _userRepository.Insert(newUser, "123456");
                    if (result.Succeeded)
                    {
                        await _userRepository.AddUserToRole(newUser, EUserRole.Admin.ToString());
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}
