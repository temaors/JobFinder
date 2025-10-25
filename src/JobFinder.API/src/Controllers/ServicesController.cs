using JobFinder.Application.DTO;
using JobFinder.Application.Services;
using JobFinder.Core.Models;
using JobFinder.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : BaseController
    {
        private readonly IJobService _jobService;

        public ServicesController(JobFinderDbContext context, IJobService jobService) 
            : base (context)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDTO>>> GetServices()
        {
            try
            {
                var services = await _jobService.GetAllJobsAsync();
                var serviceDtos = services.Select(service => new ServiceDTO
                {
                    Id = service.Id,
                    Title = service.Title,
                    Description = service.Description,
                    Price = service.Price,
                    WorkerId = service.WorkerId,
                    WorkerName = service.Worker?.User?.Name ?? "Unknown",
                    CreatedAt = service.CreatedAt,
                    Status = service.Status,
                    Category = service.Category,
                    Location = service.Location,
                    IsRemote = service.IsRemote,
                    Rating = service.Rating,
                    CompletedOrders = service.CompletedOrders
                });

                return Ok(serviceDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDTO>> GetService(Guid id)
        {
            try
            {
                var service = await _jobService.GetJobByIdAsync(id);
                if (service == null)
                    return NotFound(new { message = "Service not found" });

                var serviceDto = new ServiceDTO
                {
                    Id = service.Id,
                    Title = service.Title,
                    Description = service.Description,
                    Price = service.Price,
                    WorkerId = service.WorkerId,
                    WorkerName = service.Worker?.User?.Name ?? "Unknown",
                    CreatedAt = service.CreatedAt,
                    Status = service.Status,
                    Category = service.Category,
                    Location = service.Location,
                    IsRemote = service.IsRemote,
                    Rating = service.Rating,
                    CompletedOrders = service.CompletedOrders
                };

                return Ok(serviceDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<ServiceDTO>> CreateService([FromBody] CreateServiceDTO createServiceDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var service = new Service
                {
                    Title = createServiceDto.Title,
                    Description = createServiceDto.Description,
                    Price = createServiceDto.Price,
                    Category = createServiceDto.Category,
                    Location = createServiceDto.Location,
                    IsRemote = createServiceDto.IsRemote
                };

                var createdService = await _jobService.CreateJobAsync(service);

                var serviceDto = new ServiceDTO
                {
                    Id = createdService.Id,
                    Title = createdService.Title,
                    Description = createdService.Description,
                    Price = createdService.Price,
                    WorkerId = createdService.WorkerId,
                    CreatedAt = createdService.CreatedAt,
                    Status = createdService.Status,
                    Category = createdService.Category,
                    Location = createdService.Location,
                    IsRemote = createdService.IsRemote,
                    Rating = createdService.Rating,
                    CompletedOrders = createdService.CompletedOrders
                };

                return CreatedAtAction(nameof(GetService), new { id = serviceDto.Id }, serviceDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(Guid id, [FromBody] UpdateServiceDTO updateServiceDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var existingService = await _jobService.GetJobByIdAsync(id);
                if (existingService == null)
                    return NotFound(new { message = "Service not found" });

                existingService.Title = updateServiceDto.Title;
                existingService.Description = updateServiceDto.Description;
                existingService.Price = updateServiceDto.Price;
                existingService.Status = updateServiceDto.Status;
                existingService.Category = updateServiceDto.Category;
                existingService.Location = updateServiceDto.Location;
                existingService.IsRemote = updateServiceDto.IsRemote;
                existingService.UpdatedAt = DateTime.UtcNow;

                await _jobService.UpdateJobAsync(existingService);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(Guid id)
        {
            try
            {
                var service = await _jobService.GetJobByIdAsync(id);
                if (service == null)
                    return NotFound(new { message = "Service not found" });

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