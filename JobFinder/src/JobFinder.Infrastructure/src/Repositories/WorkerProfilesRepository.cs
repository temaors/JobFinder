using JobFinder.Core.Models;
using JobFinder.Infrastructure.Database;

namespace JobFinder.Infrastructure.Repositories
{
    public class WorkerProfilesRepository : Repository<WorkerProfile>
    {
        public WorkerProfilesRepository(JobFinderDbContext context) :
            base(context)
        { }
    }
}