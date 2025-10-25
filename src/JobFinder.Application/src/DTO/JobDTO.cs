using JobFinder.Core.Enums;

namespace JobFinder.Application.DTO
{
    public class ServiceDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public Guid WorkerId { get; set; }
        public string WorkerName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public ServiceStatus Status { get; set; }
        public ServiceCategory Category { get; set; }
        public string? Location { get; set; }
        public bool IsRemote { get; set; }
        public double Rating { get; set; }
        public int CompletedOrders { get; set; }
    }
    
    public class CreateServiceDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public ServiceCategory Category { get; set; }
        public string? Location { get; set; }
        public bool IsRemote { get; set; }
    }
    
    public class UpdateServiceDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public ServiceStatus Status { get; set; }
        public ServiceCategory Category { get; set; }
        public string? Location { get; set; }
        public bool IsRemote { get; set; }
    }
    
    public class OrderDTO
    {
        public Guid Id { get; set; }
        public Guid ServiceId { get; set; }
        public string ServiceTitle { get; set; } = string.Empty;
        public string CustomerId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? ScheduledDate { get; set; }
        public DateTime? CompletedAt { get; set; }
        public OrderStatus Status { get; set; }
        public string? CustomerNotes { get; set; }
        public string? WorkerNotes { get; set; }
        public decimal TotalPrice { get; set; }
        public string? Address { get; set; }
        public string? ContactPhone { get; set; }
    }
    
    public class CreateOrderDTO
    {
        public Guid ServiceId { get; set; }
        public DateTime? ScheduledDate { get; set; }
        public string? CustomerNotes { get; set; }
        public string? Address { get; set; }
        public string? ContactPhone { get; set; }
    }
    
    public class UpdateOrderDTO
    {
        public OrderStatus Status { get; set; }
        public string? WorkerNotes { get; set; }
        public DateTime? ScheduledDate { get; set; }
    }
    
    public class WorkerProfileDTO
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Specialization { get; set; }
        public double Rating { get; set; }
        public int CompletedOrders { get; set; }
        public string? Bio { get; set; }
        public string? Experience { get; set; }
        public List<ServiceCategory> Categories { get; set; } = new();
        public bool IsVerified { get; set; }
        public DateTime CreatedAt { get; set; }
    }
} 
