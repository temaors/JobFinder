using JobFinder.Application.DTO;
using JobFinder.Core.Models;
using JobFinder.Core.Enums;
using JobFinder.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : BaseController
    {
        public OrdersController(JobFinderDbContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
        {
            try
            {
                var orders = await _context.Orders
                    .Include(o => o.Service)
                    .Include(o => o.Customer)
                    .ToListAsync();

                var orderDtos = orders.Select(order => new OrderDTO
                {
                    Id = order.Id,
                    ServiceId = order.ServiceId,
                    ServiceTitle = order.Service?.Title ?? "Unknown",
                    CustomerId = order.CustomerId,
                    CustomerName = order.Customer?.Name ?? "Unknown",
                    CreatedAt = order.CreatedAt,
                    ScheduledDate = order.ScheduledDate,
                    CompletedAt = order.CompletedAt,
                    Status = order.Status,
                    CustomerNotes = order.CustomerNotes,
                    WorkerNotes = order.WorkerNotes,
                    TotalPrice = order.TotalPrice,
                    Address = order.Address,
                    ContactPhone = order.ContactPhone
                });

                return Ok(orderDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(Guid id)
        {
            try
            {
                var order = await _context.Orders
                    .Include(o => o.Service)
                    .Include(o => o.Customer)
                    .FirstOrDefaultAsync(o => o.Id == id);

                if (order == null)
                    return NotFound(new { message = "Order not found" });

                var orderDto = new OrderDTO
                {
                    Id = order.Id,
                    ServiceId = order.ServiceId,
                    ServiceTitle = order.Service?.Title ?? "Unknown",
                    CustomerId = order.CustomerId,
                    CustomerName = order.Customer?.Name ?? "Unknown",
                    CreatedAt = order.CreatedAt,
                    ScheduledDate = order.ScheduledDate,
                    CompletedAt = order.CompletedAt,
                    Status = order.Status,
                    CustomerNotes = order.CustomerNotes,
                    WorkerNotes = order.WorkerNotes,
                    TotalPrice = order.TotalPrice,
                    Address = order.Address,
                    ContactPhone = order.ContactPhone
                };

                return Ok(orderDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody] CreateOrderDTO createOrderDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var service = await _context.Services.FindAsync(createOrderDto.ServiceId);
                if (service == null)
                    return NotFound(new { message = "Service not found" });

                var order = new Order
                {
                    ServiceId = createOrderDto.ServiceId,
                    CustomerId = "temp-customer-id", // TODO: Get from authentication
                    ScheduledDate = createOrderDto.ScheduledDate,
                    CustomerNotes = createOrderDto.CustomerNotes,
                    Address = createOrderDto.Address,
                    ContactPhone = createOrderDto.ContactPhone,
                    TotalPrice = service.Price
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                var orderDto = new OrderDTO
                {
                    Id = order.Id,
                    ServiceId = order.ServiceId,
                    ServiceTitle = service.Title,
                    CustomerId = order.CustomerId,
                    CustomerName = "Customer", // TODO: Get from user context
                    CreatedAt = order.CreatedAt,
                    ScheduledDate = order.ScheduledDate,
                    CompletedAt = order.CompletedAt,
                    Status = order.Status,
                    CustomerNotes = order.CustomerNotes,
                    WorkerNotes = order.WorkerNotes,
                    TotalPrice = order.TotalPrice,
                    Address = order.Address,
                    ContactPhone = order.ContactPhone
                };

                return CreatedAtAction(nameof(GetOrder), new { id = orderDto.Id }, orderDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(Guid id, [FromBody] UpdateOrderDTO updateOrderDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var existingOrder = await _context.Orders.FindAsync(id);
                if (existingOrder == null)
                    return NotFound(new { message = "Order not found" });

                existingOrder.Status = updateOrderDto.Status;
                existingOrder.WorkerNotes = updateOrderDto.WorkerNotes;
                existingOrder.ScheduledDate = updateOrderDto.ScheduledDate;

                if (updateOrderDto.Status == OrderStatus.Completed)
                {
                    existingOrder.CompletedAt = DateTime.UtcNow;
                }

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            try
            {
                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                    return NotFound(new { message = "Order not found" });

                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }
}
