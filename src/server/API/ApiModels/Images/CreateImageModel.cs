namespace API.ApiModels.Images
{
    public class CreateImageModel
    {
        public IFormFile File { get; set; }
        public string Title { get; set; }
    }
}
