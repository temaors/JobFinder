using Microsoft.AspNetCore.Identity;

namespace JobFinder.Core.Models
{
	public class User : IdentityUser
	{
		public string? Name { get; set; }
		public string? Phone { get; set; }
		public string? Address { get; set; }
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
		public bool IsActive { get; set; } = true;
	}
}

