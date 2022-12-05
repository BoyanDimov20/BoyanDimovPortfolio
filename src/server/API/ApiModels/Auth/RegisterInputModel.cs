using System.ComponentModel.DataAnnotations;

namespace API.ApiModels.Auth
{
    public class RegisterInputModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string? Name { get; set; }
    }
}
