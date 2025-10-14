using JobFinder.Core.Models;

namespace JobFinder.Application.Services
{
    public interface IJobService
    {
        Task<IEnumerable<Job>> GetAllJobsAsync();
        Task<Job?> GetJobByIdAsync(Guid id);
        Task<Job> CreateJobAsync(Job job);
        Task<Job> UpdateJobAsync(Job job);
        Task DeleteJobAsync(Guid id);
        //Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(Guid workerId);
    }
} 