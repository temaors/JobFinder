using Microsoft.EntityFrameworkCore;
using JobFinder.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace JobFinder.Infrastructure.Database
{
    public class JobFinderDbContext : IdentityDbContext<User>
    {
        public JobFinderDbContext() { }
        public JobFinderDbContext(DbContextOptions<JobFinderDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<WorkerProfile> WorkerProfiles { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // For design-time migrations only
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=jobfinder;Username=postgres;Password=postgres");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Additional model configurations can be added here
        }
    }
}