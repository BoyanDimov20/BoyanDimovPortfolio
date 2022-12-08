using Microsoft.AspNetCore.Identity;

namespace Data.DbModels
{
    public class User : IdentityUser, IEntity
    {
        public User()
        {
            Id = Guid.NewGuid().ToString();
            CreatedOn = DateTime.Now;
            UpdatedOn = DateTime.Now;
        }
        public string? FirstName { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<Image> Images { get; set; }
    }
}
