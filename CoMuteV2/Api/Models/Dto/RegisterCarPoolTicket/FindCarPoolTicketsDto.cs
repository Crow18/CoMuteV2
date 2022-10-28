using System.ComponentModel.DataAnnotations;

namespace CoMuteV2.Api.Models.Dto.RegisterCarPoolTicket
{
    public class FindCarPoolTicketsDto
    {
        [MaxLength(500)]
        public string Search { get; set; } = string.Empty;
    }
}
