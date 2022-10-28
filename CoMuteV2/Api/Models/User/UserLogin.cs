using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.User
{
    public class UserLogin
    {
        public int UserID { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
