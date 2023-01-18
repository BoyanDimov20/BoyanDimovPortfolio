using System.ComponentModel.DataAnnotations;

namespace API.ApiModels.Contact
{
    public class EmailModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
