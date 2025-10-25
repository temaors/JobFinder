using JobFinder.Core.Models;

namespace JobFinder.Application.Services
{
    public interface IJobService
    {
        Task<IEnumerable<Service>> GetAllJobsAsync();
        Task<Service?> GetJobByIdAsync(Guid id);
        Task<Service> CreateJobAsync(Service service);
        Task<Service> UpdateJobAsync(Service service);
        Task DeleteJobAsync(Guid id);
        //Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(Guid workerId);
    }
} 