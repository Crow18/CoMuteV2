using CoMuteV2.Api.Context;
using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Models.Dto.RegisterCarPoolTicket;
using CoMuteV2.Api.Models.RegisteredCarPoolTicket;
using System.Data;
using Dapper;
using System.Linq;
using CoMuteV2.Api.Models.CreatedCarPoolTicket;

namespace CoMuteV2.Api.Repositories
{
    public class RegisteredCarPoolTicketsRepository : IRegisteredCarPoolTicketRepository
    {
        private readonly SQLContext _sqlContext;
        public RegisteredCarPoolTicketsRepository(SQLContext sqlContext) => _sqlContext = sqlContext;

        public async Task<IEnumerable<FoundCarPoolTickets>> FindTodaysCarPoolTickets()
        {
            string procedureName = "FindTodaysCarPoolTickets";

            using (var connection = _sqlContext.CreateConnection())
            {
                var todaysRegisteredCarPoolTicket = await connection.QueryAsync<FoundCarPoolTickets>(procedureName, commandType: CommandType.StoredProcedure);

                return todaysRegisteredCarPoolTicket.ToList();
            }
        }

        public async Task<IEnumerable<FoundCarPoolTickets>> FindCarPoolTickets(FindCarPoolTicketsDto findCarPoolTicketsDto)
        {
            string procedureName = "FindCarPoolTickets";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("Search", findCarPoolTicketsDto.Search, DbType.String);

            using (var connection = _sqlContext.CreateConnection())
            {
                var registeredCarPoolTicket = await connection.QueryAsync<FoundCarPoolTickets>(procedureName, parameters, commandType: CommandType.StoredProcedure);

                return registeredCarPoolTicket.ToList();
            }
        }

        public async Task<IEnumerable<GetRegiseteredCarPoolTickets>> GetRegisteredCarPoolTickets(int id)
        {
            string procedureName = "GetRegisteredCarPoolTickets";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("PassengerID", id, DbType.Int32);

            using (var connection = _sqlContext.CreateConnection())
            {
                var registeredCarPoolTickets = await connection.QueryAsync<GetRegiseteredCarPoolTickets>(procedureName, parameters, commandType: CommandType.StoredProcedure);

                return registeredCarPoolTickets.ToList();
            }
        }

        public async Task<RegisteredCarPoolTicket?> RegisterToCarPoolTicket(RegisterCarPoolTicketDto registerCarPoolTicketDto, int id)
        {
            string procedureName = "RegisterToCarPoolTicket";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("CarPoolTicketID", id, DbType.Int32);
            parameters.Add("PassengerID", registerCarPoolTicketDto.PassengerId, DbType.Int32);
            parameters.Add("PassengerNote", registerCarPoolTicketDto.PassengerNote, DbType.String);

            using (var connection = _sqlContext.CreateConnection())
            {
                var registeredCarPoolTicket = await connection.QueryFirstAsync<RegisteredCarPoolTicket?>(procedureName, parameters, commandType: CommandType.StoredProcedure);

                return registeredCarPoolTicket;                
            }
        }

        public async Task<CancelledRegisteredCarPoolTicket?> CancelRegisteredCarPoolTicket(CancelRegisteredCarPoolTicketDto cancelRegisteredCarPoolTicketDto, int id)
        {
            string procedureName = "CancelRegisteredCarPoolTicketByID";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("CarPoolTicketID", id, DbType.Int32);
            parameters.Add("PassengerID", cancelRegisteredCarPoolTicketDto.PassengerID, DbType.Int32);

            using (var connection = _sqlContext.CreateConnection())
            {
                var registeredCarPoolTicket = await connection.QueryFirstOrDefaultAsync<CancelledRegisteredCarPoolTicket?>(procedureName, parameters, commandType: CommandType.StoredProcedure);

                return registeredCarPoolTicket;
            }
        }
    }
}
