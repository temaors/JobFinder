using Microsoft.EntityFrameworkCore;
using JobFinder.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

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
        public DbSet<Job> Jobs { get; set; }
        public DbSet<WorkerProfile> WorkerProfiles { get; set; }
    }
}