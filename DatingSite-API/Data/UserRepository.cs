using System.Collections.Generic;
using System.Threading.Tasks;
using DatingSite_API.Helpers;
using DatingSite_API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingSite_API.Data
{
    public class UserRepository : GenericRepository, IUserRepository
    {


        private readonly DataContext _context;
        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public Task<Photo> GetPhoto(int Id)
        {
           return  _context.Photos.FirstOrDefaultAsync(p=>p.Id== Id);
        }

        public async Task<User> GetUser(int Id)
        {
           var user = await _context.Users.Include(p=> p.Photos).FirstOrDefaultAsync(u=>u.Id == Id);
           return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
          var users = _context.Users.Include(p=> p.Photos);
          return await PagedList<User>.CreatedListAsync(users, userParams.CurrentPage, userParams.PageSize);
        
        }
    }
}