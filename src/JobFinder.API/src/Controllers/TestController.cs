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

        [HttpGet("services")]
        public IActionResult GetTestServices()
        {
            var testServices = new List<ServiceDTO>
            {
                new ServiceDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Клининг квартиры",
                    Description = "Профессиональная уборка квартиры: мытье полов, пылесос, уборка санузла и кухни. Использую только экологически чистые средства.",
                    Price = 2500,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Мария Иванова",
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    Status = JobFinder.Core.Enums.ServiceStatus.Available,
                    Category = JobFinder.Core.Enums.ServiceCategory.Cleaning,
                    Location = "Москва",
                    IsRemote = false,
                    Rating = 4.8,
                    CompletedOrders = 45
                },
                new ServiceDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Ремонт компьютера",
                    Description = "Диагностика и ремонт ПК, ноутбуков. Установка ОС, настройка программ, замена комплектующих. Выезд на дом.",
                    Price = 3000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Алексей Петров",
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    Status = JobFinder.Core.Enums.ServiceStatus.Available,
                    Category = JobFinder.Core.Enums.ServiceCategory.Repair,
                    Location = "Санкт-Петербург",
                    IsRemote = false,
                    Rating = 4.9,
                    CompletedOrders = 78
                },
                new ServiceDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Доставка продуктов",
                    Description = "Быстрая доставка продуктов из магазинов. Работаю с 8:00 до 22:00. Доставка в течение 1-2 часов.",
                    Price = 500,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Дмитрий Козлов",
                    CreatedAt = DateTime.UtcNow.AddHours(-12),
                    Status = JobFinder.Core.Enums.ServiceStatus.Available,
                    Category = JobFinder.Core.Enums.ServiceCategory.Delivery,
                    Location = "Москва",
                    IsRemote = false,
                    Rating = 4.7,
                    CompletedOrders = 156
                },
                new ServiceDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Уход за садом",
                    Description = "Стрижка газона, обрезка кустов, посадка цветов, полив растений. Опыт работы 5+ лет.",
                    Price = 4000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Елена Волкова",
                    CreatedAt = DateTime.UtcNow.AddHours(-6),
                    Status = JobFinder.Core.Enums.ServiceStatus.Available,
                    Category = JobFinder.Core.Enums.ServiceCategory.Gardening,
                    Location = "Новосибирск",
                    IsRemote = false,
                    Rating = 4.6,
                    CompletedOrders = 23
                },
                new ServiceDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Выгул собак",
                    Description = "Профессиональный выгул собак любых пород. Опыт работы с животными 3 года. Готов к долгим прогулкам.",
                    Price = 800,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Анна Смирнова",
                    CreatedAt = DateTime.UtcNow.AddHours(-3),
                    Status = JobFinder.Core.Enums.ServiceStatus.Available,
                    Category = JobFinder.Core.Enums.ServiceCategory.PetCare,
                    Location = "Екатеринбург",
                    IsRemote = false,
                    Rating = 4.9,
                    CompletedOrders = 67
                },
                new ServiceDTO
                {
                    Id = Guid.NewGuid(),
                    Title = "Репетитор по математике",
                    Description = "Подготовка к ЕГЭ, ОГЭ, помощь с домашними заданиями. Опыт преподавания 8 лет. Онлайн и офлайн занятия.",
                    Price = 2000,
                    WorkerId = Guid.NewGuid(),
                    WorkerName = "Ольга Морозова",
                    CreatedAt = DateTime.UtcNow.AddHours(-1),
                    Status = JobFinder.Core.Enums.ServiceStatus.Available,
                    Category = JobFinder.Core.Enums.ServiceCategory.Tutoring,
                    Location = "Казань",
                    IsRemote = true,
                    Rating = 4.8,
                    CompletedOrders = 89
                }
            };

            return Ok(testServices);
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

