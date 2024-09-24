using Microsoft.EntityFrameworkCore;
using WebApplication2.Models.Domaim;

namespace WebApplication2.Data
{
    public class BloggieDbContext : DbContext
    {
        public BloggieDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Tag> Tags { get; set; }
    }
}
