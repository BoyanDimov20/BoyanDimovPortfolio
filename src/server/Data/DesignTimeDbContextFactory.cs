using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Data
{
    internal class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var path = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            var DbPath = Path.Join(path, "portfolio.db");


            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseSqlite($"Data Source={DbPath}");

            return new ApplicationDbContext(builder.Options);
        }
    }
}
