namespace Data.DbModels
{
    public class Image : IEntity
    {
        public Image()
        {
            Id = Guid.NewGuid().ToString();
            CreatedOn = DateTime.Now;
            UpdatedOn = DateTime.Now;
        }
        public string Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public string PublicId { get; set; }

        public ICollection<Comment> Comments { get; set; }

    }
}
