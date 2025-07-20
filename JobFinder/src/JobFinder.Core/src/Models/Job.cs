﻿namespace JobFinder.Core.Models
{
    public class Job
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public Guid WorkerId { get; set; }
        public WorkerProfile? Worker { get; set; }
    }
}

