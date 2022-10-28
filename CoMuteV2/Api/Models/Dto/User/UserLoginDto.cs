using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.Dto.UserDto
{
    public class UserLoginDto
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email required")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "Password required")]
        public string Password { get; set; } = string.Empty;
    }
}
