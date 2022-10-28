using CoMuteV2.Api.Models.CreatedCarPoolTicket;
using CoMuteV2.Api.Models.Dto.RegisterCarPoolTicket;
using CoMuteV2.Api.Models.RegisteredCarPoolTicket;

namespace CoMuteV2.Api.Contracts
{
    public interface IRegisteredCarPoolTicketRepository
    {
        public Task<IEnumerable<FoundCarPoolTickets>> FindCarPoolTickets(FindCarPoolTicketsDto findCarPoolTicketsDto);
        public Task<IEnumerable<FoundCarPoolTickets>> FindTodaysCarPoolTickets();
        public Task<IEnumerable<GetRegiseteredCarPoolTickets>> GetRegisteredCarPoolTickets(int id);
        public Task<RegisteredCarPoolTicket?> RegisterToCarPoolTicket(RegisterCarPoolTicketDto registerCarPoolTicketDto, int id);
        public Task<CancelledRegisteredCarPoolTicket?> CancelRegisteredCarPoolTicket(CancelRegisteredCarPoolTicketDto cancelRegisteredCarPoolTicketDto, int id);
    }
}
