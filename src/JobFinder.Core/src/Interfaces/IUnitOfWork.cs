using JobFinder.Core.Models;

namespace JobFinder.Core.Interfaces
{
    public interface IUnitOfWork
    {
        public Task<int> SaveChangesAsync();

        public void Dispose();
        IRepository<Service> ServicesRepository { get; }
        IRepository<WorkerProfile> WorkerProfilesRepository { get; }
        IRepository<User> UsersRepository { get; }
    }
}