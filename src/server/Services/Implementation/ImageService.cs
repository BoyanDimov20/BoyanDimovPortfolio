using Data.DbModels;
using Data.Repository;
using Services.Contracts;

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
    }
}
