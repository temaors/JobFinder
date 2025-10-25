using JobFinder.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace JobFinder.Core.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        
        public Guid ServiceId { get; set; }
        public Service? Service { get; set; }
        
        public string CustomerId { get; set; } = string.Empty;
        public User? Customer { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ScheduledDate { get; set; }
        public DateTime? CompletedAt { get; set; }
        
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        
        [StringLength(500)]
        public string? CustomerNotes { get; set; }
        
        [StringLength(500)]
        public string? WorkerNotes { get; set; }
        
        [Range(0, double.MaxValue)]
        public decimal TotalPrice { get; set; }
        
        [StringLength(200)]
        public string? Address { get; set; }
        
        public string? ContactPhone { get; set; }
    }
}

