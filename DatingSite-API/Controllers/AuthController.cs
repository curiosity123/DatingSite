using System.Threading.Tasks;
using DatingSite_API.Data;
using DatingSite_API.Dtos;
using DatingSite_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingSite_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;

        public AuthController(IAuthRepository repository)
        {
            _repository = repository;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

            if (await _repository.UserExists(userForRegisterDto.UserName))
                return BadRequest("Użytkownik o takiej nazwie już istnieje");

            var userToCreate = new User
            {
                UserName = userForRegisterDto.UserName
            };
            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }


    }
}