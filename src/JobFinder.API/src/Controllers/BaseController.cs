using JobFinder.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.API.Controllers
{
	public class BaseController : ControllerBase
	{
		protected readonly JobFinderDbContext _context;

		public BaseController(JobFinderDbContext context)
		{
			_context = context;
		}
	}
}

