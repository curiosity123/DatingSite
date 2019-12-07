using System.Collections.Generic;
using System.Threading.Tasks;
using DatingSite_API.Models;

namespace DatingSite_API.Data
{
    public interface IUserRepository:IGenericRepository
    {
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int Id);
    }
}