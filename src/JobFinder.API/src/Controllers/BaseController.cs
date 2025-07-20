using JobFinder.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.API.Controllers
{
	public class BaseController : ControllerBase
	{
		private readonly JobFinderDbContext _context;

		public BaseController(JobFinderDbContext context)
		{
			_context = context;
		}
	}
}

