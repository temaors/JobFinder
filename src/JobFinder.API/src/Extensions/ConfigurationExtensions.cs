using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using JobFinder.Infrastructure.Database;
using JobFinder.Core.Models;
using JobFinder.Application.Services;
using JobFinder.Core.Interfaces;
using JobFinder.Infrastructure;

namespace JobFinder.API
{
    public static class ConfigurationExtensions
    {
        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Default")
                ?? throw new InvalidOperationException("Connection string Default is not found");

            // Database
            services.AddDbContext<JobFinderDbContext>(options =>
                options.UseNpgsql(connectionString));

            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<JobFinderDbContext>()
                .AddDefaultTokenProviders();

            // Repositories
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            //services.AddScoped<IJobsRepository, JobsRepository>();
            //services.AddScoped<IUsersRepository, UsersRepository>();
            //services.AddScoped<IWorkerProfilesRepository, WorkerProfilesRepository>();

            // Services
            services.AddScoped<IJobService, JobService>();
            //services.AddScoped<IUserService, UserService>();
            //services.AddScoped<IAuthService, AuthService>();

            // Controllers
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Swagger
            services.AddEndpointsApiExplorer();
            services.ConfigureSwagger();
            
        }

        public static void ConfigureSwagger(this IServiceCollection services) =>
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "JobFinder API",
                    Version = "v1",
                    Description = "API для платформы поиска работы"
                });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
            });
        
    }
}