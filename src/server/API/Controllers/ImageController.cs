using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Data.DbModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly Cloudinary cloudinary;
        private readonly IImageService imageService;
        private readonly UserManager<User> userManager;

        public ImageController(Cloudinary cloudinary, IImageService imageService, UserManager<User> userManager)
        {
            this.cloudinary = cloudinary;
            this.imageService = imageService;
            this.userManager = userManager;
        }

        public async Task<IActionResult> GetAll()
        {
            var images = await this.imageService.GetAll();

            return this.Ok(images);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.Name, stream)
                };

                uploadResult = cloudinary.Upload(uploadParams);
            }

            var userId = this.userManager.GetUserId(User);
            await this.imageService.CreateImage(userId, file.Name, uploadResult.SecureUrl.ToString());

            return Ok();
        }
    }
}
