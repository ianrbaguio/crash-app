using Crash.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crash.Database
{
   public class AppDbContext: DbContext
   {
      public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
      {
      }

      /*
         NOTE: When adding new table in the future, we'll have to name it in lower case
               as for some reason when doing the migrations using dotnet ef, it creates
               the table name case-sensitive. Using CREATE TABLE [name] in postgres or pgAdmin
               it creates the table names in all lower-case.
      */
      public DbSet<Accident> accident { get; set;}
        public DbSet<Image> image { get; set; }
        public DbSet<CrashUser> crashuser { get; set;}
   }
}
