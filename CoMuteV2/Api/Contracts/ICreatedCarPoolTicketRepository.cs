using CoMuteV2.Api.Models.CreatedCarPoolTicket;
using CoMuteV2.Api.Models.Dto.CreatedCarPoolTicket;

namespace CoMuteV2.Api.Contracts
{
    public interface ICreatedCarPoolTicketRepository
    {
        public Task<IEnumerable<CreatedCarPoolTicket>> GetCreatedCarPoolTickets(int id);
        public Task<CreatedCarPoolTicket?> CreateCarPoolTicket(CreateCarPoolTicketDto createCarPoolTicketDto, int id);
        public Task<UpdatedCarPoolTicket> UpdateCarPoolTicket(UpdateCarPoolTicketDto updateCarPoolTicketDto, int id);
        public Task<CancelledCarPoolTicket?> CancelCarPoolTicket(int id);
    }
}
