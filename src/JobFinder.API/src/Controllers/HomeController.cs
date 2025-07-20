using Microsoft.AspNetCore.Mvc;
using JobFinder.Core.Models;
using JobFinder.Infrastructure.Database;

namespace JobFinder.API.Controllers
{
	[ApiController, Route("home")]
	public class HomeController : BaseController
	{

		public HomeController(JobFinderDbContext context) 
			: base(context)
		{ }
		
		// [HttpGet ("view")]
		// public async Task<ActionResult> Index()
		// {

		// 	return Ok(new User());
		// }
	}
}

