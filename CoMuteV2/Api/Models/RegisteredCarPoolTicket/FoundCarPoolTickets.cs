using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.RegisteredCarPoolTicket
{
    public class FoundCarPoolTickets
    {
        public int CarPoolTicketID { get; set; }
        public string OwnerName { get; set; } = string.Empty;
        public string OwnerSurname { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        [MaxLength(500), MinLength(3)]
        public string Origin { get; set; } = string.Empty;
        [MaxLength(500), MinLength(3)]
        public string Destination { get; set; } = string.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ExpectedArrivalTime { get; set; }
        public int AvailableSeats { get; set; }
        public int DaysAvailable { get; set; }
        public string Note { get; set; } = string.Empty;
    }
}
