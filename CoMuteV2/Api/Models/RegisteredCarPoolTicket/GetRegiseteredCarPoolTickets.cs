using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.RegisteredCarPoolTicket
{
    public class GetRegiseteredCarPoolTickets
    {
        public int CarPoolTicketAllocationID { get; set; }
        public int CarPoolTicketID { get; set; }
        public DateTime PassengerRegisterDate { get; set; }
        [MaxLength(800)]
        public string CreatorNote { get; set; } = String.Empty;
        [MaxLength(500), MinLength(3)]
        public string Origin { get; set; } = String.Empty;
        [MaxLength(500), MinLength(3)]
        public string Destination { get; set; } = String.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ExpectedArrivalTime { get; set; }
        public int AvailableSeats { get; set; }
        public int DaysAvailable { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Surname { get; set; } = String.Empty;
        public string PassengerStatus { get; set; } = String.Empty;
    }
}
