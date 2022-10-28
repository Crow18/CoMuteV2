using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Models.Dto.Passengers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoMuteV2.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class PassengersController : ControllerBase
    {
        private readonly IPassengersRepository _passengersRepository;
        public PassengersController(IPassengersRepository passengersRepository) => _passengersRepository = passengersRepository;


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPassengers(int id)
        {
            var passengers = await _passengersRepository.GetPassengers(id);
            return Ok(passengers);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AcceptPassenger([FromBody] PassengerAcceptDto passengerAcceptDto, int id)
        {
            var passengerTicketID = await _passengersRepository.AcceptPassenger(passengerAcceptDto, id);
            if (passengerTicketID is not null)
            {
                return Ok(passengerTicketID);
            }
            return BadRequest("Cant accept this passenger");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> DeclinePassenger([FromBody] PassengerDeclineDto passengerDeclineDto, int id)
        {
            var passengerTicketID = await _passengersRepository.DeclinePassenger(passengerDeclineDto, id);
            if (passengerTicketID is not null)
            {
                return Ok(passengerTicketID);
            }
            return BadRequest("Cant decline this passenger");
        }
    }
}
