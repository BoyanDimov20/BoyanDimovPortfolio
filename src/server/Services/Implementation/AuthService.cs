using Data.DbModels;
using Data.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Contracts;
using Services.Dtos;

namespace Services.Implementation
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> userManager;
        private readonly IRepository repository;

        public AuthService(UserManager<User> userManager, IRepository repository)
        {
            this.userManager = userManager;
            this.repository = repository;
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

        public async Task<User> GetUserById(string id)
        {
            var user = await this.repository.GetById<User>(id).FirstOrDefaultAsync();

            return user;
        }
    }
}
