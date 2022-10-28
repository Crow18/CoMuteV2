using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.Dto.CreatedCarPoolTicket
{
    public class UpdateCarPoolTicketDto
    {
        [MaxLength(500), MinLength(3)]
        public string Origin { get; set; } = String.Empty;
        [MaxLength(500), MinLength(3)]
        public string Destination { get; set; } = String.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ExpectedArrivalTime { get; set; }
        public int AvailableSeats { get; set; }
        public string Note { get; set; } = string.Empty;
    }
}
