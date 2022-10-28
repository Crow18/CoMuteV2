namespace CoMuteV2.Api.Context
{
    public class AppConfig
    {
        private readonly IConfiguration _config;
        public AppConfig(IConfiguration config)
        {
            _config = config;
        }

        public string GetSecret()
        {
            return _config.GetSection("Secret:Token").Value;
        }
    }
}
