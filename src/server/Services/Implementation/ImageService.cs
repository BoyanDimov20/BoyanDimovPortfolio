using Data.DbModels;
using Data.Repository;
using Microsoft.EntityFrameworkCore;
using Services.Contracts;
using Services.Dtos.ImageDtos;

namespace Services.Implementation
{
    public class ImageService : IImageService
    {
        private readonly IRepository repository;

        public ImageService(IRepository repository)
        {
            this.repository = repository;
        }

        public async Task CreateImage(string userId, string title, string url, string publicId)
        {
            var image = new Image
            {
                UserId = userId,
                Title = title,
                Url = url,
                PublicId = publicId
            };

            await this.repository.Add(image);
        }

        public async Task<IEnumerable<ImageDto>> GetAll()
        {
            var images = await this.repository.GetAll<Image>().Select(x => new ImageDto
            {
                Id = x.Id,
                Url = x.Url,
                Title = x.Title,
                Username = x.User.UserName
            }).ToListAsync();

            return images;
        }

        public async Task<GetImagePublicIdDto> GetImagePublicId(string id)
        {
            var publicId = await this.repository.GetById<Image>(id).Select(x => new GetImagePublicIdDto
            {
                PublicId = x.PublicId,
                UserId = x.UserId
            }).FirstOrDefaultAsync();

            return publicId;
        }

        public async Task DeleteImage(string id)
        {
            await this.repository.DeleteById<Image>(id);
        }
    }
}
