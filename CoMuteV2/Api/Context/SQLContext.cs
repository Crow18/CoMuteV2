using System.Data;
using System.Data.SqlClient;

namespace CoMuteV2.Api.Context
{
    public class SQLContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public SQLContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("Constr");
        }

        public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
    }
}
