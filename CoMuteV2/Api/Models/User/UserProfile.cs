using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.User
{
    public class UserProfile
    {
        public int UserID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }
}
