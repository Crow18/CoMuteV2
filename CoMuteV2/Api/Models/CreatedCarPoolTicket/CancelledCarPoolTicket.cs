using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.CreatedCarPoolTicket
{
    public class CancelledCarPoolTicket
    {
        public int CarPoolTicketId { get; set; }
        public int OwnerId { get; set; }
        [MaxLength(500), MinLength(3)]
        public string Origin { get; set; } = string.Empty;
        [MaxLength(500), MinLength(3)]
        public string Destination { get; set; } = string.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ExpectedArrivalTime { get; set; }
        public int AvailableSeats { get; set; }
        public int DaysAvailable { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Note { get; set; } = String.Empty;
        public string Status { get; set; } = String.Empty;
    }
}
