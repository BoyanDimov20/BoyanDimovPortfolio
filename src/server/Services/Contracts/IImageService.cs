using Services.Dtos.ImageDtos;

namespace Services.Contracts
{
    public interface IImageService
    {
        public Task CreateImage(string userId, string title, string url, string publicId);

        public Task<IEnumerable<ImageDto>> GetAll();

        public Task<GetImagePublicIdDto> GetImagePublicId(string id);

        public Task DeleteImage(string id);
    }
}
