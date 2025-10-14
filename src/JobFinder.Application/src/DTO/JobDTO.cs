using JobFinder.Core.Enums;

namespace JobFinder.Application.DTO
{
    public class JobDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public Guid WorkerId { get; set; }
        public string WorkerName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public JobStatus Status { get; set; }
        public JobType Type { get; set; }
        public string? Location { get; set; }
        public bool IsRemote { get; set; }
    }
    
    public class CreateJobDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public JobType Type { get; set; }
        public string? Location { get; set; }
        public bool IsRemote { get; set; }
    }
    
    public class UpdateJobDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public JobStatus Status { get; set; }
        public JobType Type { get; set; }
        public string? Location { get; set; }
        public bool IsRemote { get; set; }
    }
} 
