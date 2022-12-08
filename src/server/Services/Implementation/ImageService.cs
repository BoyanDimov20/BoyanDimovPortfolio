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

        public async Task CreateImage(string userId, string title, string url)
        {
            var image = new Image
            {
                UserId = userId,
                Title = title,
                Url = url
            };

            await this.repository.Add(image);
        }

        public async Task<IEnumerable<ImageDto>> GetAll()
        {
            var images = await this.repository.GetAll<Image>().Select(x => new ImageDto
            {
                Id = x.Id,
                Url = x.Url
            }).ToListAsync();

            return images;
        }
    }
}
