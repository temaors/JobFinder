using JobFinder.Core.Models;
using JobFinder.Infrastructure.Database;

namespace JobFinder.Infrastructure.Repositories
{
    public class ServicesRepository : Repository<Service>
    {
        public ServicesRepository(JobFinderDbContext context) :
            base(context)
        { }
    }
}