namespace JobFinder.Core.Enums
{
    public enum ServiceStatus
    {
        Available,
        Unavailable,
        Paused
    }
    
    public enum ServiceCategory
    {
        Cleaning,
        Repair,
        Delivery,
        Gardening,
        PetCare,
        Tutoring,
        Photography,
        Beauty,
        Other
    }
    
    public enum OrderStatus
    {
        Pending,
        Confirmed,
        InProgress,
        Completed,
        Cancelled,
        Rejected
    }
}
