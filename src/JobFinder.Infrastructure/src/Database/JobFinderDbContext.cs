using Microsoft.EntityFrameworkCore;
using JobFinder.Core.Models;

namespace JobFinder.Infrastructure.Database
{
	public class JobFinderDbContext : DbContext
	{
		public JobFinderDbContext(DbContextOptions<JobFinderDbContext> options)
			: base(options)
		{

		}

		public DbSet<User> Users { get; set; }
		public DbSet<Job> Jobs { get; set; }
		public DbSet<WorkerProfile> WorkerProfiles { get; set; }
	}
}