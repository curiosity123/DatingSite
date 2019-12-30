using System;
using System.Collections.Generic;
using System.Linq;
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
            return _context.Photos.FirstOrDefaultAsync(p => p.Id == Id);
        }

        public async Task<User> GetUser(int Id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == Id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {



            var users = _context.Users.Include(p => p.Photos).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            if (userParams.City != null)
                users = users.Where(u => u.City == userParams.City);

            if (userParams.Gender != null)
                users = users.Where(u => u.Gender == userParams.Gender);


            if (userParams.MinAge != 18)
                users = users.Where(u => u.DateOfBirth <= DateTime.Now.AddYears(-userParams.MinAge));
            if (userParams.MaxAge != 100)
                users = users.Where(u => u.DateOfBirth >= DateTime.Now.AddYears(-userParams.MaxAge));


            if (userParams.MartialStatus != null)
                users = users.Where(u => u.MartialStatus == userParams.MartialStatus);

            if (userParams.Children != null)
                users = users.Where(u => u.Children == userParams.Children);






            if (userParams.SortByLastActive == true)
                users = users.OrderByDescending(x => x.LastActive);
            else
                users = users.OrderByDescending(x => x.Created);


            return await PagedList<User>.CreatedListAsync(users, userParams.CurrentPage, userParams.PageSize);

        }
    }
}