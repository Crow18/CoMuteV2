namespace CoMuteV2.Api.Models.User
{
    public class UserLoginDetail
    {
        public int UserID { get; set; }
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } 
        public byte[] PasswordSalt { get; set; } 
    }
}
