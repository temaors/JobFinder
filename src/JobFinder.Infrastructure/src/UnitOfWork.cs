using JobFinder.Core.Interfaces;
using JobFinder.Infrastructure.Database;
using JobFinder.Infrastructure.Repositories;
using JobFinder.Core.Models;

namespace JobFinder.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly JobFinderDbContext _context;
        private IRepository<Job> _jobsRepository;
        private IRepository<User> _usersRepository;
        private IRepository<WorkerProfile> _workerProfilesRepository;

        public UnitOfWork(JobFinderDbContext context)
        {
            _context = context;
        }

        public IRepository<Job> JobsRepository { get { return _jobsRepository ??= new Repository<Job>(_context); } }
        public IRepository<User> UsersRepository { get { return _usersRepository ??= new Repository<User>(_context); } }
        public IRepository<WorkerProfile> WorkerProfilesRepository { get { return _workerProfilesRepository ??= new Repository<WorkerProfile>(_context); } }

        public async Task<int> SaveChangesAsync() =>
            await _context.SaveChangesAsync();

        public void Dispose() =>
            _context.Dispose();
    }
}