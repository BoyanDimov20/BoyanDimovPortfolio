using Data.DbModels;
using Microsoft.AspNetCore.Identity;
using Services.Contracts;
using Services.Dtos;

namespace Services.Implementation
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> userManager;

        public AuthService(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<ResponseModel<User>> CreateUser(string username, string password, string name)
        {
            var id = Guid.NewGuid().ToString();
            var user = new User
            {
                Id = id,
                UserName = username,
                FirstName = name,
            };

            var result = await this.userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                return new ResponseModel<User>(result.Errors.FirstOrDefault().Description);
            }

            return new ResponseModel<User>(user);
        }

    }
}
