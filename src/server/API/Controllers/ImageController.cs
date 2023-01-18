using API.ApiModels.Images;
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
        public async Task<IActionResult> Post([FromForm]CreateImageModel model)
        {
            var uploadResult = new ImageUploadResult();
            if (model.File.Length > 0)
            {
                using var stream = model.File.OpenReadStream();
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(model.File.Name, stream),
                    Format = "webp"
                };

                uploadResult = cloudinary.Upload(uploadParams);
            }

            var userId = this.userManager.GetUserId(User);

            await this.imageService.CreateImage(userId, model.Title, uploadResult.SecureUrl.ToString(), uploadResult.PublicId);

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var image = await this.imageService.GetImagePublicId(id);
            var currentUserId = this.userManager.GetUserId(User);

            if (currentUserId != image.UserId)
            {
                return this.Unauthorized();
            }

            var result = cloudinary.DeleteResources(ResourceType.Image, image.PublicId);

            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                await this.imageService.DeleteImage(id);
            }

            return Ok();
        }
    }
}
