namespace JobFinder.Core.Models
{
    public class WorkerProfile
    {
        public Guid Id { get; set; }
        public string? Specialization { get; set; }
        public double Rating { get; set; }
        public required string UserId { get; set; }
        public User? User { get; set; }
    }
}

