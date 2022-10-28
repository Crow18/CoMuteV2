using CoMuteV2.Api.Context;
using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Models.Passengers;
using System.Data;
using Dapper;
using CoMuteV2.Api.Models.Dto.Passengers;

namespace CoMuteV2.Api.Repositories
{
    public class PassengersRepository : IPassengersRepository
    {
        private SQLContext _sqlContext;
        public PassengersRepository(SQLContext sqlContext) => _sqlContext = sqlContext;

        public async Task<IEnumerable<Passengers>> GetPassengers(int id)
        {
            string procedureName = "GetPassengersByCarPoolTicketID";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("CarPoolTicketID", id, DbType.Int32);

            using (var connection = _sqlContext.CreateConnection())
            {
                var passengers = await connection.QueryAsync<Passengers>(procedureName, parameters, commandType: CommandType.StoredProcedure);
                return passengers.ToList();
            }
        }

        public async Task<PassengerTicket?> AcceptPassenger(PassengerAcceptDto passengerAcceptDto, int id)
        {
            string procedureName = "AcceptPassenger";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("PassengerID", id, DbType.Int32);
            parameters.Add("CarPoolTicketID", passengerAcceptDto.CarPoolTicketID, DbType.Int32);


            using (var connection = _sqlContext.CreateConnection())
            {
                var passengerTicketID = await connection.QueryFirstOrDefaultAsync<PassengerTicket?>(procedureName, parameters, commandType: CommandType.StoredProcedure);
                return passengerTicketID;
            }
        }

        public async Task<PassengerTicket?> DeclinePassenger(PassengerDeclineDto passengerDeclineDto, int id)
        {
            string procedureName = "DeclinePassenger";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("PassengerID", id, DbType.Int32);
            parameters.Add("CarPoolTicketID", passengerDeclineDto.CarPoolTicketID, DbType.Int32);


            using (var connection = _sqlContext.CreateConnection())
            {
                var passengerTicketID = await connection.QueryFirstOrDefaultAsync<PassengerTicket?>(procedureName, parameters, commandType: CommandType.StoredProcedure);
                return passengerTicketID;
            }
        }
    }
}
