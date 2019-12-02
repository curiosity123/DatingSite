using System.ComponentModel.DataAnnotations;

namespace DatingSite_API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage="Nazwa użytkownika jest wymagana")]
        public string UserName { get; set; }

        [Required(ErrorMessage="Hasło jest wymagane")]
        [StringLength(12, MinimumLength=6,ErrorMessage="Hasło musi składać się z minimum 6 i max 12 znaków")]
        public string Password { get; set; }

    }
}