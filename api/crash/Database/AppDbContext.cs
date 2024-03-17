using Crash.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crash.Database
{
   public class AppDbContext: DbContext
   {
      public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
      {
      }

      public DbSet<Accident> accident { get; set;}
      public DbSet<CrashUser> crashuser { get; set;}
   }
}
