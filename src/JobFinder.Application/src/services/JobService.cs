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

        public async Task<IEnumerable<Service>> GetAllJobsAsync()
        {
            return _unitOfWork.ServicesRepository.Get();
        }

        public async Task<Service?> GetJobByIdAsync(Guid id)
        {
            return _unitOfWork.ServicesRepository.GetById(id);
        }

        public async Task<Service> CreateJobAsync(Service service)
        {
            service.Id = Guid.NewGuid();
            _unitOfWork.ServicesRepository.Insert(service);
            await _unitOfWork.SaveChangesAsync();
            return service;
        }

        public async Task<Service> UpdateJobAsync(Service service)
        {
            _unitOfWork.ServicesRepository.Update(service);
            await _unitOfWork.SaveChangesAsync();
            return service;
        }

        public async Task DeleteJobAsync(Guid id)
        {
            var service =  _unitOfWork.ServicesRepository.GetById(id);
            if (service != null)
            {
                _unitOfWork.ServicesRepository.Delete(service);
                await _unitOfWork.SaveChangesAsync();
            }
        }

        //public async Task<IEnumerable<Job>> GetJobsByWorkerIdAsync(Guid workerId)
        //{
        //    return await _unitOfWork.Jobs.GetJobsByWorkerIdAsync(workerId);
        //}
    }
} 