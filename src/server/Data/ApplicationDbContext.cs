using Data.DbModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().HasMany(x => x.Comments)
                .WithOne(x => x.User).HasForeignKey(x => x.UserId);

            builder.Entity<Image>().HasMany(x => x.Comments)
                .WithOne(x => x.Image).HasForeignKey(x => x.ImageId);

            builder.Entity<User>().HasMany(x => x.Images)
               .WithOne(x => x.User).HasForeignKey(x => x.UserId);
        }
    }
}
