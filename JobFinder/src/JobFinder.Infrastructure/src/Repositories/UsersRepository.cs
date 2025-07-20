using JobFinder.Core.Models;
using JobFinder.Infrastructure.Database;

namespace JobFinder.Infrastructure.Repositories
{
    public class UsersRepository : Repository<User>
    {
        public UsersRepository(JobFinderDbContext context) :
            base(context)
        { }
    }
}