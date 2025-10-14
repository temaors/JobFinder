using JobFinder.Core.Interfaces;
using JobFinder.Core.Models;

namespace JobFinder.Application.Services
{
    public class JobService : IJobService
    {
        private readonly IUnitOfWork _unitOfWork;

        public JobService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Job>> GetAllJobsAsync()
        {
            return _unitOfWork.JobsRepository.Get();
        }

        public async Task<Job?> GetJobByIdAsync(Guid id)
        {
            return _unitOfWork.JobsRepository.GetById(id);
        }

        public async Task<Job> CreateJobAsync(Job job)
        {
            job.Id = Guid.NewGuid();
            _unitOfWork.JobsRepository.Insert(job);
            await _unitOfWork.SaveChangesAsync();
            return job;
        }

        public async Task<Job> UpdateJobAsync(Job job)
        {
            _unitOfWork.JobsRepository.Update(job);
            await _unitOfWork.SaveChangesAsync();
            return job;
        }

        public async Task DeleteJobAsync(Guid id)
        {
            var job =  _unitOfWork.JobsRepository.GetById(id);
            if (job != null)
            {
                _unitOfWork.JobsRepository.Delete(job);
                await _unitOfWork.SaveChangesAsync();
            }
        }

        //public async Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(Guid workerId)
        //{
        //    return await _unitOfWork.Jobs.GetJobsByWorkerIdAsync(workerId);
        //}
    }
} 