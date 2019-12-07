using System.Threading.Tasks;
using DatingSite_API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace DatingSite_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public IUserRepository _repo { get; }
        public UsersController(IUserRepository repo)
        {
            _repo = repo;

        }


[HttpGet]
public async Task<IActionResult> GetUsers()
{
    var users = await _repo.GetUsers();
    return Ok(users);
}
[HttpGet("{id}")]
public async Task<IActionResult> GetUser(int id)
{
    var user = await _repo.GetUser(id);
    return Ok(user);
}



    }
}