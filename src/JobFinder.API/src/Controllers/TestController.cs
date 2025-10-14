using Microsoft.AspNetCore.Mvc;
using JobFinder.Application.DTO;

namespace JobFinder.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { message = "API is running!", timestamp = DateTime.UtcNow });
        }

        [HttpGet("jobs")]
        public IActionResult GetTestJobs()
        {
            var testJobs = new List<JobDTO>
            {
                new JobDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Разработчик .NET",
                    Description = "Ищем опытного разработчика .NET для работы над интересными проектами. Требования: знание C#, ASP.NET Core, Entity Framework, SQL Server.",
                    Price = 150000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Иван Петров",
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    Status = JobFinder.Core.Enums.JobStatus.Active,
                    Type = JobFinder.Core.Enums.JobType.FullTime,
                    Location = "Москва",
                    IsRemote = false
                },
                new JobDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Frontend разработчик React",
                    Description = "Нужен опытный React разработчик для создания современных веб-приложений. Опыт работы с TypeScript, Material-UI обязателен.",
                    Price = 120000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Анна Сидорова",
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    Status = JobFinder.Core.Enums.JobStatus.Active,
                    Type = JobFinder.Core.Enums.JobType.FullTime,
                    Location = "Санкт-Петербург",
                    IsRemote = true
                },
                new JobDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "DevOps инженер",
                    Description = "Ищем DevOps инженера для настройки CI/CD, работы с Docker, Kubernetes, Azure/AWS. Опыт с мониторингом обязателен.",
                    Price = 180000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Михаил Козлов",
                    CreatedAt = DateTime.UtcNow.AddHours(-12),
                    Status = JobFinder.Core.Enums.JobStatus.Active,
                    Type = JobFinder.Core.Enums.JobType.FullTime,
                    Location = "Москва",
                    IsRemote = true
                },
                new JobDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "UI/UX дизайнер",
                    Description = "Требуется креативный UI/UX дизайнер для создания интерфейсов мобильных и веб-приложений. Опыт работы с Figma, Adobe Creative Suite.",
                    Price = 90000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Елена Волкова",
                    CreatedAt = DateTime.UtcNow.AddHours(-6),
                    Status = JobFinder.Core.Enums.JobStatus.InProgress,
                    Type = JobFinder.Core.Enums.JobType.PartTime,
                    Location = "Новосибирск",
                    IsRemote = true
                },
                new JobDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Тестировщик ПО",
                    Description = "Ищем QA инженера для тестирования веб и мобильных приложений. Знание автоматизации тестирования, Selenium, Postman приветствуется.",
                    Price = 80000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Дмитрий Смирнов",
                    CreatedAt = DateTime.UtcNow.AddHours(-3),
                    Status = JobFinder.Core.Enums.JobStatus.Active,
                    Type = JobFinder.Core.Enums.JobType.Contract,
                    Location = "Екатеринбург",
                    IsRemote = false
                },
                new JobDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Системный аналитик",
                    Description = "Требуется системный аналитик для анализа бизнес-процессов, создания технических требований и работы с заказчиками.",
                    Price = 110000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Ольга Морозова",
                    CreatedAt = DateTime.UtcNow.AddHours(-1),
                    Status = JobFinder.Core.Enums.JobStatus.Completed,
                    Type = JobFinder.Core.Enums.JobType.FullTime,
                    Location = "Казань",
                    IsRemote = false
                }
            };

            return Ok(testJobs);
        }

        [HttpGet("users")]
        public IActionResult GetTestUsers()
        {
            var testUsers = new[]
            {
                new { Id = 1, Name = "Иван Петров", Email = "ivan@example.com", Role = "Developer" },
                new { Id = 2, Name = "Анна Сидорова", Email = "anna@example.com", Role = "Developer" },
                new { Id = 3, Name = "Михаил Козлов", Email = "mikhail@example.com", Role = "DevOps" }
            };

            return Ok(testUsers);
        }
    }
}
