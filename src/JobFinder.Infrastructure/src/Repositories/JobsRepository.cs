using JobFinder.Core.Models;
using JobFinder.Infrastructure.Database;

namespace JobFinder.Infrastructure.Repositories
{
    public class JobsRepository : Repository<Job>
    {
        public JobsRepository(JobFinderDbContext context) :
            base(context)
        { }
    }
}