using System;

namespace DatingSite_API.Dtos
{
    public class UserForListDto
    {
        
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }


        //main
        public string Gender { get; set; }

        public int Age { get; set; }

        public string ZodiacSign { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

public string PhotoUrl { get; set; }

    }
}