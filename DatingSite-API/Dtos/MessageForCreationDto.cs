using System;

namespace DatingSite_API.Dtos
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public string Content { get; set; }
        public DateTime DateSend { get; set; }


        public MessageForCreationDto()
        {
            DateSend = DateTime.Now;
        }
    }
}