using API.ApiModels.Auth;
using Data;
using Data.DbModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> signInManger;
        private readonly IAuthService authService;

        public AuthController(SignInManager<User> signInManger, IAuthService authService)
        {
            this.signInManger = signInManger;
            this.authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginInputModel model)
        {
            if(!ModelState.IsValid) {
                return this.Unauthorized(ModelState.FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage);
            }

            var response = await this.signInManger.PasswordSignInAsync(model.Username, model.Password, true, false);

            if(response.Succeeded)
            {
                return Ok();
            }

            return this.Unauthorized("Invalid Password");
        }

        public async Task<IActionResult> Logout()
        {
            await this.signInManger.SignOutAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return this.Unauthorized(ModelState.FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage);
            }

            var response = await this.authService.CreateUser(model.Username, model.Password, model.Name);

            if (response.IsSuccess)
            {
                await this.signInManger.SignInAsync(response.Result, false);
                return Ok();
            }

            return Unauthorized(response.ErrorMessage);
        }

        public async Task<IActionResult> Me()
        {
            var user = await this.signInManger.UserManager.GetUserAsync(User);
            return Ok(new
            {
                Id = user?.Id,
                IsAuthenticated = User.Identity.IsAuthenticated,
                Name = user?.FirstName,
                Username = user?.UserName
            });
        }
    }
}
