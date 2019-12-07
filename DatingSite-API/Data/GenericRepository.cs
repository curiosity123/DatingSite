using System.Threading.Tasks;

namespace DatingSite_API.Data
{
    public class GenericRepository : IGenericRepository
    {
        public DataContext _context { get; }

        public GenericRepository(DataContext context)
        {
            _context = context;

        }


        public void Add<T>(T entity) where T : class
        {
           _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync()>0;
        }
    }
}