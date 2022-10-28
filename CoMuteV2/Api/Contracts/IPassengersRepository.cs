using CoMuteV2.Api.Models.Dto.Passengers;
using CoMuteV2.Api.Models.Passengers;

namespace CoMuteV2.Api.Contracts
{
    public interface IPassengersRepository
    {
        public Task<IEnumerable<Passengers>> GetPassengers(int id);
        public Task<PassengerTicket?> AcceptPassenger(PassengerAcceptDto passengerAcceptDto, int id);
        public Task<PassengerTicket?> DeclinePassenger(PassengerDeclineDto passengerDeclineDto, int id);
    }
}
