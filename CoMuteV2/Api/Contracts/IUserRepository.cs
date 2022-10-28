using CoMuteV2.Api.Models.Dto.UserDto;
using CoMuteV2.Api.Models.User;

namespace CoMuteV2.Api.Contracts
{
    public interface IUserRepository
    {
        public Task<UserRegister> RegisterNewUser(UserRegisterDto userRegisterDto);
        public Task<UserLogin?> LoginUser(UserLoginDto userLoginDto);
        public Task<UserProfile?> UpdateUserDetails(UserUpdateProfileDto userUpdateProfileDto, int id);
        public Task<UserProfile?> GetUserProfile(int id);
    }
}
