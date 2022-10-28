using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Models.Dto.CreatedCarPoolTicket;
using CoMuteV2.Api.Models.Dto.UserDto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CoMuteV2.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CreatedCarPoolTicketController : ControllerBase
    {
        private readonly ICreatedCarPoolTicketRepository _createdCarPoolTicketRepository;
        public CreatedCarPoolTicketController(ICreatedCarPoolTicketRepository createdCarPoolTicketRepository) =>  _createdCarPoolTicketRepository = createdCarPoolTicketRepository;

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCreatedCarPoolTickets(int id)
        {
            var carPoolTickets = await _createdCarPoolTicketRepository.GetCreatedCarPoolTickets(id);
            return Ok(carPoolTickets);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> CreateCarPoolTicket([FromBody]CreateCarPoolTicketDto createCarPoolTicketDto, int id)
        {
            var carPoolTicket = await _createdCarPoolTicketRepository.CreateCarPoolTicket(createCarPoolTicketDto, id);
            if(carPoolTicket is null)
            {
                return BadRequest("Could not create Ticket, you may have registered or created a ticket within these times");
            }
            return Ok(carPoolTicket);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCarPoolTicket([FromBody] UpdateCarPoolTicketDto updateCarPoolTicketDto, int id)
        {
            var carPoolTicket = await _createdCarPoolTicketRepository.UpdateCarPoolTicket(updateCarPoolTicketDto, id);
            return Ok(carPoolTicket);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> CancelCarPoolTicket(int id)
        {
            var carPoolTicket = await _createdCarPoolTicketRepository.CancelCarPoolTicket(id);
            if(carPoolTicket is not null)
            {
                return Ok(carPoolTicket);
            }
            return BadRequest("could not cancel this ticket");
        }
    }
}
