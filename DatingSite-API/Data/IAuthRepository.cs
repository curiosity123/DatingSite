using System.Threading.Tasks;
using DatingSite_API.Models;

namespace DatingSite_API.Data
{
    public interface IAuthRepository
    {
        Task<User> Login(string username, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);

    }
}