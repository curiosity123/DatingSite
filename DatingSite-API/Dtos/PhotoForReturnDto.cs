using System;

namespace DatingSite_API.Dtos
{
    public class PhotoForReturnDto
    {
        
                public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsMain { get; set; }

        public string CloudinaryId { get; set; }
    }
}