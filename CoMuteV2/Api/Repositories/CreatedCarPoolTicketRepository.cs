using CoMuteV2.Api.Context;
using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Models.CreatedCarPoolTicket;
using CoMuteV2.Api.Models.Dto.CreatedCarPoolTicket;
using Dapper;
using System.Data;

namespace CoMuteV2.Api.Repositories
{
    public class CreatedCarPoolTicketRepository : ICreatedCarPoolTicketRepository
    {
        private readonly SQLContext _sqlContext;
        public CreatedCarPoolTicketRepository(SQLContext sqlContext)
        {
            _sqlContext = sqlContext;
        }

        public async Task<IEnumerable<CreatedCarPoolTicket>> GetCreatedCarPoolTickets(int id)
        {
            string procedureName = "GetCreatedCarPoolTickets";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("UserID", id, DbType.Int32);

            using (var connection = _sqlContext.CreateConnection())
            {
                var carPoolTickets = await connection.QueryAsync<CreatedCarPoolTicket>(procedureName, parameters, commandType: CommandType.StoredProcedure);
                return carPoolTickets;
            }
        }

        public async Task<CreatedCarPoolTicket?> CreateCarPoolTicket(CreateCarPoolTicketDto createCarPoolTicketDto, int id)
        {
            string procedureName = "CreateCarPoolTicket";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("OwnerId", id, DbType.Int32);
            parameters.Add("Origin", createCarPoolTicketDto.Origin, DbType.String);
            parameters.Add("Destination", createCarPoolTicketDto.Destination, DbType.String);
            parameters.Add("ExpectedArrivalTime", createCarPoolTicketDto.ExpectedArrivalTime, DbType.DateTime);
            parameters.Add("DepartureTime", createCarPoolTicketDto.DepartureTime, DbType.DateTime);
            parameters.Add("AvailableSeats", createCarPoolTicketDto.AvailableSeats, DbType.Int32);
            parameters.Add("Note", createCarPoolTicketDto.Note, DbType.String);

            using (var connection = _sqlContext.CreateConnection())
            {
                CreatedCarPoolTicket? carPoolTicket = await connection.QueryFirstAsync<CreatedCarPoolTicket?>(procedureName, parameters, commandType: CommandType.StoredProcedure);

                if (carPoolTicket is not null)
                {
                    return carPoolTicket;
                }
                throw new Exception("Could not create this Ticket, you may have a Created/Registered ticket within these timeframes");
            }
        }

        public async Task<UpdatedCarPoolTicket> UpdateCarPoolTicket(UpdateCarPoolTicketDto updateCarPoolTicketDto, int id)
        {
            string procedureName = "UpdateCreatedCarPoolTicketByID";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("CarPoolTicketID", id, DbType.Int32);
            parameters.Add("From", updateCarPoolTicketDto.Origin, DbType.String);
            parameters.Add("To", updateCarPoolTicketDto.Destination, DbType.String);
            parameters.Add("DepartureTime", updateCarPoolTicketDto.DepartureTime, DbType.DateTime);
            parameters.Add("ExpectedArrivalTime", updateCarPoolTicketDto.ExpectedArrivalTime, DbType.DateTime);
            parameters.Add("AvailableSeats", updateCarPoolTicketDto.AvailableSeats, DbType.Int32);
            parameters.Add("Note", updateCarPoolTicketDto.Note, DbType.String);

            using (var connection = _sqlContext.CreateConnection())
            {
                UpdatedCarPoolTicket carPoolTicket = await connection.QueryFirstAsync<UpdatedCarPoolTicket>(procedureName, parameters, commandType: CommandType.StoredProcedure);
                if (carPoolTicket is not null)
                {
                    return carPoolTicket;
                }
                throw new Exception("Could update this Ticket");
            }
        }

        public async Task<CancelledCarPoolTicket?> CancelCarPoolTicket(int id)
        {
            string procedureName = "CancelCreatedCarPoolTicketByID";
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("CarPoolTicketId", id, DbType.Int32);

            using (var connection = _sqlContext.CreateConnection())
            {
                CancelledCarPoolTicket? carPoolTicket = await connection.QueryFirstOrDefaultAsync<CancelledCarPoolTicket?>(procedureName, parameters, commandType: CommandType.StoredProcedure);
                return carPoolTicket;
            }
        }
    }
}
