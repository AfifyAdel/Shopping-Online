using Domain.Communication;
using Domain.Constants.Enums;
using Domain.Entities;
using Domain.Models.AccountModels;
using Domain.Repositories;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IPasswordHasher<User> _hasher;

        public AccountService(IUserRepository userRepository,
            SignInManager<User> signInManager, IPasswordHasher<User> hasher,
             IHttpContextAccessor contextAccessor,ITokenService tokenService)
        {
            _userRepository = userRepository;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _hasher = hasher;
        }
        public async Task<GeneralResponse<User>> Login(LoginModel loginModel)
        {
            await CreateAdmin();
            var user = await _userRepository.GetByUsername(loginModel.UserName);

            if (user == null)
            {
                return new GeneralResponse<User>("Email or Password is not correct", EResponseStatus.Error);
            }
            var response = await _signInManager.PasswordSignInAsync(user, loginModel.Password, true, false);
            if (response.Succeeded)
            {
                var claims = new ClaimsIdentity(new Claim[]
                            {
                            new Claim(ClaimTypes.Name, user.Id.ToString())
                            });
                user.Token = _tokenService.GenerateAccessToken(claims);
                user.Password = string.Empty;
                return new GeneralResponse<User>(user);
            }
            else
            {
                return new GeneralResponse<User>("Email or Password is not correct", EResponseStatus.Error);
            }
        }

        public async Task<GeneralResponse<bool>> Register(User user)
        {
            try
            {
                // Check if username exist
                var userDB = await _userRepository.GetByUsername(user.UserName);
                if (userDB != null)
                {
                    return new GeneralResponse<bool>("Username already exists", EResponseStatus.Error);
                }

                // Check if email exist
                userDB = await _userRepository.GetByEmail(user.Email);
                if (userDB != null)
                {
                    return new GeneralResponse<bool>("Email already exists", EResponseStatus.Error);
                }
                user.RoleId = (int)EUserRole.Customer;
                user.Password = _hasher.HashPassword(user, user.Password);

                var result = await _userRepository.Insert(user);

                if (result)
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
                        Password="123456",
                        RoleId = (int)EUserRole.Admin
                    };
                    newUser.Password = _hasher.HashPassword(newUser, newUser.Password);
                    await _userRepository.Insert(newUser);
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
