using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.Dto.RegisterCarPoolTicket
{
    public class RegisterCarPoolTicketDto
    {
        public int PassengerId { get; set; }
        [MaxLength(800)]
        public string PassengerNote { get; set; } = string.Empty;
    }
}
