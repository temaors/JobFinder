using JobFinder.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace JobFinder.Core.Models
{
    public class WorkerProfile
    {
        public Guid Id { get; set; }
        
        [StringLength(200)]
        public string? Specialization { get; set; }
        
        [Range(0, 5)]
        public double Rating { get; set; } = 0;
        
        public required string UserId { get; set; }
        public User? User { get; set; }
        
        public int CompletedOrders { get; set; } = 0;
        
        [StringLength(500)]
        public string? Bio { get; set; }
        
        [StringLength(100)]
        public string? Experience { get; set; }
        
        public List<ServiceCategory> Categories { get; set; } = new();
        
        public bool IsVerified { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

