using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Filters;
using CoMuteV2.Api.Models.Dto.UserDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoMuteV2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository) => _userRepository = userRepository;

        [HttpPost]
        public async Task<ActionResult> RegisterNewUser([FromBody] UserRegisterDto userRegisterDto)
        {
            var user = await _userRepository.RegisterNewUser(userRegisterDto);
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult> LoginUser([FromBody] UserLoginDto userLoginDto)
        {
            var user = await _userRepository.LoginUser(userLoginDto);
            if (user is null)
            {
                return BadRequest("Invalid credentials");
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult?> UpdateUserDetails([FromBody] UserUpdateProfileDto userUpdateProfileDto, int id)
        {
            var user = await _userRepository.UpdateUserDetails(userUpdateProfileDto, id);
            if (user is null)
            {
                return BadRequest("This user could not be updated");
            }
            return Ok(user);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult?> GetUserProfile(int id)
        {
            var user = await _userRepository.GetUserProfile(id);
            if(user is null)
            {
                return NotFound("This user culd not be found");
            }
            return Ok(user);
        }

    }
}
