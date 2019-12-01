using Microsoft.EntityFrameworkCore;
using DatingSite.API.Models;

namespace DatingSite.API.Data
{
    public class DataContext:DbContext
    {
         public DataContext(DbContextOptions<DataContext> options):base(options)
         {
             
         }


         public DbSet<Value> Values  { get; set; }
    }
}