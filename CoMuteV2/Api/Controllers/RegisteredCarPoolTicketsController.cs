using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Models.Dto.RegisterCarPoolTicket;
using CoMuteV2.Api.Models.RegisteredCarPoolTicket;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoMuteV2.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class RegisteredCarPoolTicketsController : ControllerBase
    {
        private readonly IRegisteredCarPoolTicketRepository _registeredCarPoolTicketRepository;
        public RegisteredCarPoolTicketsController(IRegisteredCarPoolTicketRepository registeredCarPoolTicketRepository) => _registeredCarPoolTicketRepository = registeredCarPoolTicketRepository;

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRegisteredCarPoolTickets(int id)
        {
            var registeredTickets = await _registeredCarPoolTicketRepository.GetRegisteredCarPoolTickets(id);
            return Ok(registeredTickets);
        }

        [HttpPost]
        public async Task<IActionResult> FindCarPoolTickets([FromBody] FindCarPoolTicketsDto findCarPoolTicketsDto)
        {
            var foundTickets = await _registeredCarPoolTicketRepository.FindCarPoolTickets(findCarPoolTicketsDto);
            return Ok(foundTickets);
        }
        
        [HttpGet]
        public async Task<IActionResult> FindTodaysCarPoolTickets()
        {
            var foundTickets = await _registeredCarPoolTicketRepository.FindTodaysCarPoolTickets();
            return Ok(foundTickets);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> RegisterToCarPoolTicket([FromBody] RegisterCarPoolTicketDto registerCarPoolTicketDto, int id)
        {
            var registeredTicket = await _registeredCarPoolTicketRepository.RegisterToCarPoolTicket(registerCarPoolTicketDto, id);
            if (registeredTicket is not null)
            {
                if (registeredTicket.CarPoolTicketAllocationId == 0)
                {
                    return BadRequest("Cannot register to this car pool ticket you have conflicting time frames with other car pool tickets");
                }
                return Ok(registeredTicket);
            }
            return BadRequest("Cannot register to this car pool ticket");
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> CancelRegisteredCarPoolTicket([FromBody] CancelRegisteredCarPoolTicketDto cancelRegisteredCarPoolTicketDto, int id)
        {
            var cancelledRegisteredTicket = await _registeredCarPoolTicketRepository.CancelRegisteredCarPoolTicket(cancelRegisteredCarPoolTicketDto, id);
            if(cancelledRegisteredTicket is not null)
            {
                return Ok(cancelledRegisteredTicket);
            }
            return BadRequest("Could not cancel registration to this ticket");
        }

    }
}
