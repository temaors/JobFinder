using JobFinder.Core.Interfaces;
using JobFinder.Infrastructure.Database;

namespace JobFinder.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly JobFinderDbContext _context;
        //repositories

        public UnitOfWork(JobFinderDbContext context)
        {
            _context = context;

            //repository initialize
        }
        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}