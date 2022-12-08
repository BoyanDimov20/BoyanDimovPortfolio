namespace Data.DbModels
{
    public class Comment : IEntity
    {
        public Comment()
        {
            Id = Guid.NewGuid().ToString();
            CreatedOn = DateTime.Now;
            UpdatedOn = DateTime.Now;
        }
        public string Id { get; set; }
        public string Content { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public Image Image { get; set; }
        public string ImageId { get; set; }
    }
}
