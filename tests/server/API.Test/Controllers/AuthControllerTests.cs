using API.ApiModels.Auth;
using API.Controllers;
using Data.DbModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Services.Contracts;

namespace API.Test.Controllers
{
    public class FakeUserManager : UserManager<User>
    {
        public FakeUserManager()
            : base(new Mock<IUserStore<User>>().Object,
              new Mock<IOptions<IdentityOptions>>().Object,
              new Mock<IPasswordHasher<User>>().Object,
              new IUserValidator<User>[0],
              new IPasswordValidator<User>[0],
              new Mock<ILookupNormalizer>().Object,
              new Mock<IdentityErrorDescriber>().Object,
              new Mock<IServiceProvider>().Object,
              new Mock<ILogger<UserManager<User>>>().Object)
        { }

        public override Task<IdentityResult> CreateAsync(User user, string password)
        {
            return Task.FromResult(IdentityResult.Success);
        }

        public override Task<IdentityResult> AddToRoleAsync(User user, string role)
        {
            return Task.FromResult(IdentityResult.Success);
        }

        public override Task<string> GenerateEmailConfirmationTokenAsync(User user)
        {
            return Task.FromResult(Guid.NewGuid().ToString());
        }

    }
    public class FakeSignInResult : Microsoft.AspNetCore.Identity.SignInResult
    {
        public FakeSignInResult()
        {
            base.Succeeded = true;
        }
    }
    public class FakeSignInManager : SignInManager<User>
    {
        public FakeSignInManager()
                : base(new FakeUserManager(),
                     new Mock<IHttpContextAccessor>().Object,
                     new Mock<IUserClaimsPrincipalFactory<User>>().Object,
                     new Mock<IOptions<IdentityOptions>>().Object,
                     new Mock<ILogger<SignInManager<User>>>().Object,
                     new Mock<IAuthenticationSchemeProvider>().Object,
                     new Mock<IUserConfirmation<User>>().Object)
        { }
    }
    public class AuthControllerTests
    {

        public static User ValidUser = new User
        {
            UserName = "test",
            PasswordHash = "123"
        };



        [Fact]
        public async Task LoginCorrectly()
        {
            var vm = new LoginInputModel
            {
                Username = "test",
                Password = "123"
            };



            var mockSignInManager = new Mock<FakeSignInManager>();
            mockSignInManager.Setup(serv => serv.PasswordSignInAsync(ValidUser.UserName, ValidUser.PasswordHash, true, false))
                .ReturnsAsync(new FakeSignInResult());

            var authService = new Mock<IAuthService>();

            var controller = new AuthController(mockSignInManager.Object, authService.Object);

            var result = await controller.Login(vm);

            Assert.IsType<OkResult>(result);
        }
    }
}
