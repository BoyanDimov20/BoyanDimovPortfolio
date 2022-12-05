namespace Services.Contracts
{
    public interface IImageService
    {
        public Task CreateImage(string userId, string title, string url);
    }
}
