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

        public async Task<Like> GetLike(int userId, int likedUserId)
        {
            return await _context.Likes.Where(u => u.UserLikesId == userId && u.UserIsLikedId == likedUserId).FirstOrDefaultAsync();
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

        public async Task<IEnumerable<int>> GetUserLikes(int id, bool userLike)
        {
            var user = await _context.Users
            .Include(u => u.UserLikes)
            .Include(x => x.UserIsLiked)
            .FirstOrDefaultAsync(u => u.Id == id);


            if (userLike)
            {
                return user.UserLikes.Where(x => x.UserIsLikedId == id).Select(x => x.UserLikesId);
            }
            else
            {
                return user.UserIsLiked.Where(x => x.UserLikesId == id).Select(x => x.UserIsLikedId);
            }
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {

            var users = _context.Users.Include(p => p.Photos).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);



            if (userParams.UserLikes)
            {
                var userLikes = await GetUserLikes(userParams.UserId, userParams.UserLikes);
                users = users.Where(u => userLikes.Contains(u.Id));
            }

            if (userParams.UserIsLiked)
            {
                var userIsLiked = await GetUserLikes(userParams.UserId, userParams.UserLikes);
                users = users.Where(u => userIsLiked.Contains(u.Id));
            }



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