using System;
using System.Text;
using System.Threading.Tasks;
using DatingSite_API.Models;

namespace DatingSite_API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        #region Public method
        public Task<User> Login(string username, string password)
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHashSalt(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt; 
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }



        public Task<bool> UserExists(string username)
        {
            throw new System.NotImplementedException();
        }

        #endregion

        #region Private methods
        private void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
    #endregion
}