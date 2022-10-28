using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.Passengers
{
    public class Passengers
    {
        public int CarPoolTicketAllocationID { get; set; }
        public int PassengerID { get; set; }
        public string PassengerName { get; set; } = string.Empty;
        public string PassengerSurname { get; set; } = string.Empty;
        [MaxLength(800)]
        public string PassengerNote { get; set; } = string.Empty;
        public string PassengerStatus { get; set; } = string.Empty;
        public DateTime PassengerRegisterDate { get; set; }
    }
}
