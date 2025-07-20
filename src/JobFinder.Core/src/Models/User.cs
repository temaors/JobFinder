using Microsoft.AspNetCore.Identity;

namespace JobFinder.Core.Models
{
	public class User : IdentityUser
	{
		public Guid Id { get; set; } //?
		public string? Name { get; set; }
		//public string? Email { get; set; }
		public string? Phone { get; set; }
	}
}

