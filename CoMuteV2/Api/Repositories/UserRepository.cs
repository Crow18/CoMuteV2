using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Context;
using System.Data;
using Dapper;
using System.Security.Claims;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Reflection.Metadata;
using System.Diagnostics.CodeAnalysis;
using CoMuteV2.Api.Models.Dto.UserDto;
using CoMuteV2.Api.Models.User;

namespace CoMuteV2.Api.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly SQLContext _sqlContext;
        private readonly AppConfig _appConfig;

        public UserRepository(SQLContext sqlContext, AppConfig appConfig) 
        {
            _sqlContext = sqlContext;
            _appConfig = appConfig;
        }

        public async Task<UserRegister> RegisterNewUser(UserRegisterDto userRegisterDto)
        {
            CreatePasswordHash(userRegisterDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            string procedureName = "RegisterNewUser";
            var parameters = new DynamicParameters();

            parameters.Add("Name", userRegisterDto.Name, DbType.String);
            parameters.Add("Surname", userRegisterDto.Surname, DbType.String);
            parameters.Add("Phone", userRegisterDto.Phone, DbType.String);
            parameters.Add("Email", userRegisterDto.Email, DbType.String);
            parameters.Add("Password", passwordHash, DbType.Binary);
            parameters.Add("Salt", passwordSalt, DbType.Binary);

            using (var connection = _sqlContext.CreateConnection())
            {
                UserRegister user = await connection.QueryFirstAsync<UserRegister>(procedureName, parameters, commandType: CommandType.StoredProcedure);
                if(user is null)
                {
                    throw new Exception("Could not create new user");
                }
                return user;
            }
        }

        public async Task<UserLogin?> LoginUser(UserLoginDto userLoginDto)
        {
            string procedureName = "GetUserLoginDetail";
            var parameters = new DynamicParameters();

            parameters.Add("Email", userLoginDto.Email, DbType.String);

            using (var connection = _sqlContext.CreateConnection())
            {
                UserLoginDetail? user = await connection.QueryFirstOrDefaultAsync<UserLoginDetail?>(procedureName, parameters, commandType: CommandType.StoredProcedure);

                if (user is null)
                {
                    return null;
                }

                if(VerifyPasswordHash(userLoginDto.Password, user.PasswordHash, user.PasswordSalt))
                {
                    UserLogin loggedInUser = new UserLogin();

                    loggedInUser.UserID = user.UserID;
                    loggedInUser.Token = CreateToken(userLoginDto.Email);

                    return loggedInUser;
                }
                return null;
            }
        }

        public async Task<UserProfile?> GetUserProfile(int id)
        {
            string procedureName = "GetUserProfile";
            var parameters = new DynamicParameters();

            parameters.Add("UserID", id, DbType.Int32);

            using (var connection = _sqlContext.CreateConnection())
            {
                UserProfile? userProfileDetails = await connection.QueryFirstOrDefaultAsync<UserProfile?>(procedureName, parameters, commandType: CommandType.StoredProcedure);

                return userProfileDetails;
            }
        }

        public async Task<UserProfile?> UpdateUserDetails(UserUpdateProfileDto userUpdateProfileDto, int id)
        {
            CreatePasswordHash(userUpdateProfileDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
            string procedureName = "UpdateUserDetailsByUserId";
            var parameters = new DynamicParameters();

            parameters.Add("Id", id, DbType.Int32);
            parameters.Add("Name", userUpdateProfileDto.Name, DbType.String);
            parameters.Add("Surname", userUpdateProfileDto.Surname, DbType.String);
            parameters.Add("Phone", userUpdateProfileDto.Phone, DbType.String);
            parameters.Add("Email", userUpdateProfileDto.Email, DbType.String);
            parameters.Add("Password", passwordHash, DbType.Binary);
            parameters.Add("PasswordSalt", passwordSalt, DbType.Binary);

            using (var connection = _sqlContext.CreateConnection())
            {
                UserProfile? user = await connection.QueryFirstOrDefaultAsync<UserProfile?>(procedureName, parameters, commandType: CommandType.StoredProcedure);
                
                if(user is null)
                {
                    throw new Exception("Failed to update user");
                }
                return (user);
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {

            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public string CreateToken(string Email)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_appConfig.GetSecret()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

    }
}
