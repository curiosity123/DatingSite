using System.Collections.Generic;
using System.Threading.Tasks;
using DatingSite_API.Helpers;
using DatingSite_API.Models;

namespace DatingSite_API.Data
{
    public interface IUserRepository:IGenericRepository
    {
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<User> GetUser(int Id);

         Task<Photo> GetPhoto(int Id);

         Task<Like> GetLike(int userId, int likedUserId);

    }
}