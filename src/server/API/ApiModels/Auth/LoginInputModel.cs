using System.ComponentModel.DataAnnotations;

namespace API.ApiModels.Auth
{
    public class LoginInputModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
