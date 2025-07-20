using JobFinder.Core.Models;
using JobFinder.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.API.Controllers
{
    [ApiController, Route("users")]
    public class UsersController : BaseController
    {
        public UsersController(JobFinderDbContext context) :
            base(context)
        { }

        [HttpGet]
        public async Task<List<User>> GetAllusers()
        {
            List<User> users = new List<User>();
            
            return users;
        }

        [HttpGet]
        public async Task<User> GetUserById(int id)
        {
            User user = new User();

            return user;
        }

        [HttpPost("create")]
        public IActionResult CreateUser()
        {

            return Ok();
        }

        [HttpDelete("remove")]
        public IActionResult Deleteuser()
        {
            return Ok();
        }
    }
}