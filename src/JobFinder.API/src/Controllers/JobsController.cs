using JobFinder.Application.DTO;
using JobFinder.Application.Services;
using JobFinder.Core.Models;
using JobFinder.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobsController : BaseController
    {
        private readonly IJobService _jobService;

        public JobsController(JobFinderDbContext context, IJobService jobService) 
            : base (context)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobDTO>>> GetJobs()
        {
            try
            {
                var jobs = await _jobService.GetAllJobsAsync();
                var jobDtos = jobs.Select(job => new JobDTO
                {
                    Id = job.Id,
                    Title = job.Title,
                    Description = job.Description,
                    Price = job.Price,
                    WorkerId = job.WorkerId,
                    WorkerName = job.Worker?.User?.Name ?? "Unknown",
                    CreatedAt = job.CreatedAt,
                    Status = job.Status,
                    Type = job.Type,
                    Location = job.Location,
                    IsRemote = job.IsRemote
                });

                return Ok(jobDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobDTO>> GetJob(Guid id)
        {
            try
            {
                var job = await _jobService.GetJobByIdAsync(id);
                if (job == null)
                    return NotFound(new { message = "Job not found" });

                var jobDto = new JobDTO
                {
                    Id = job.Id,
                    Title = job.Title,
                    Description = job.Description,
                    Price = job.Price,
                    WorkerId = job.WorkerId,
                    WorkerName = job.Worker?.User?.Name ?? "Unknown",
                    CreatedAt = job.CreatedAt,
                    Status = job.Status,
                    Type = job.Type,
                    Location = job.Location,
                    IsRemote = job.IsRemote
                };

                return Ok(jobDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<JobDTO>> CreateJob([FromBody] CreateJobDTO createJobDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var job = new Job
                {
                    Title = createJobDto.Title,
                    Description = createJobDto.Description,
                    Price = createJobDto.Price,
                    Type = createJobDto.Type,
                    Location = createJobDto.Location,
                    IsRemote = createJobDto.IsRemote
                };

                var createdJob = await _jobService.CreateJobAsync(job);

                var jobDto = new JobDTO
                {
                    Id = createdJob.Id,
                    Title = createdJob.Title,
                    Description = createdJob.Description,
                    Price = createdJob.Price,
                    WorkerId = createdJob.WorkerId,
                    CreatedAt = createdJob.CreatedAt,
                    Status = createdJob.Status,
                    Type = createdJob.Type,
                    Location = createdJob.Location,
                    IsRemote = createdJob.IsRemote
                };

                return CreatedAtAction(nameof(GetJob), new { id = jobDto.Id }, jobDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(Guid id, [FromBody] UpdateJobDTO updateJobDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var existingJob = await _jobService.GetJobByIdAsync(id);
                if (existingJob == null)
                    return NotFound(new { message = "Job not found" });

                existingJob.Title = updateJobDto.Title;
                existingJob.Description = updateJobDto.Description;
                existingJob.Price = updateJobDto.Price;
                existingJob.Status = updateJobDto.Status;
                existingJob.Type = updateJobDto.Type;
                existingJob.Location = updateJobDto.Location;
                existingJob.IsRemote = updateJobDto.IsRemote;
                existingJob.UpdatedAt = DateTime.UtcNow;

                await _jobService.UpdateJobAsync(existingJob);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            try
            {
                var job = await _jobService.GetJobByIdAsync(id);
                if (job == null)
                    return NotFound(new { message = "Job not found" });

                await _jobService.DeleteJobAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }
} 