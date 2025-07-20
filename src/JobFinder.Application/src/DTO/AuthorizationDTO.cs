namespace JobFinder.Application.DTO
{
    public class NewUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public bool IsWorker { get; set; }
    }
}