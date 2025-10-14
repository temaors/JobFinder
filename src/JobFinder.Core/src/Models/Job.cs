using JobFinder.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace JobFinder.Core.Models
{
    public class Job
    {
        public Guid Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        
        public Guid WorkerId { get; set; }
        public WorkerProfile? Worker { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        public JobStatus Status { get; set; } = JobStatus.Active;
        public JobType Type { get; set; } = JobType.FullTime;
        
        [StringLength(100)]
        public string? Location { get; set; }
        
        public bool IsRemote { get; set; }
    }
}

