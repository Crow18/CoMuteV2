using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace CoMuteV2.Api.Models.Dto.CreatedCarPoolTicket
{
    public class CreateCarPoolTicketDto
    {
        [MaxLength(500), MinLength(3)]
        public string Origin { get; set; } = string.Empty;
        [MaxLength(500), MinLength(3)]
        public string Destination { get; set; } = string.Empty;
        public DateTime ExpectedArrivalTime { get; set; }  
        public DateTime DepartureTime { get; set; }
        public int AvailableSeats { get; set; }
        [MaxLength(800)]
        public string Note { get; set; } = String.Empty;
    }
}
