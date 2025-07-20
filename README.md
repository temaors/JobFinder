JobFinder/
├── .github/                  # GitHub Actions workflows
├── .vscode/                  # VSCode settings
├── src/                      # .NET Backend
│   ├── JobFinder.API/                # Web API Layer
│   │   ├── Controllers/               # API Controllers
│   │   │   ├── AuthController.cs
│   │   │   ├── WorkersController.cs
│   │   │   ├── JobsController.cs
│   │   │   └── ReviewsController.cs
│   │   ├── Middleware/                # Custom middleware
│   │   │   ├── ExceptionHandlingMiddleware.cs
│   │   │   └── JwtMiddleware.cs
│   │   ├── Extensions/                # Service extensions
│   │   │   └── ServiceCollectionExtensions.cs
│   │   ├── Properties/
│   │   │   └── launchSettings.json
│   │   ├── appsettings.json           # Configuration
│   │   ├── Program.cs                 # Entry point
│   │   └── JobFinder.API.csproj
│   │
│   ├── JobFinder.Core/                # Domain Layer
│   │   ├── Entities/                  # Domain models
│   │   │   ├── User.cs
│   │   │   ├── WorkerProfile.cs
│   │   │   ├── Job.cs
│   │   │   ├── Review.cs
│   │   │   └── Notification.cs
│   │   ├── Enums/                     # Enumerations
│   │   │   ├── JobType.cs
│   │   │   └── JobStatus.cs
│   │   ├── Interfaces/                # Repository interfaces
│   │   │   ├── IWorkerRepository.cs
│   │   │   └── IUnitOfWork.cs
│   │   ├── Exceptions/                # Custom exceptions
│   │   │   └── NotFoundException.cs
│   │   └── JobFinder.Core.csproj
│   │
│   ├── JobFinder.Application/         # Business Logic Layer
│   │   ├── Services/                  # Domain services
│   │   │   ├── IWorkerService.cs
│   │   │   └── WorkerService.cs
│   │   ├── Features/                  # CQRS implementation
│   │   │   ├── Workers/
│   │   │   │   ├── Queries/
│   │   │   │   │   ├── GetWorkerByIdQuery.cs
│   │   │   │   │   └── GetWorkerByIdHandler.cs
│   │   │   │   └── Commands/
│   │   │   │       ├── CreateWorkerCommand.cs
│   │   │   │       └── CreateWorkerHandler.cs
│   │   │   └── Auth/
│   │   ├── Mappings/                  # AutoMapper profiles
│   │   │   └── WorkerProfileMapping.cs
│   │   ├── Validators/                # FluentValidation
│   │   │   └── CreateWorkerValidator.cs
│   │   └── JobFinder.Application.csproj
│   │
│   ├── JobFinder.Infrastructure/      # Infrastructure Layer
│   │   ├── Data/                      # Database context
│   │   │   ├── AppDbContext.cs
│   │   │   └── SeedData.cs            # Initial data seeding
│   │   ├── Repositories/              # Repository implementations
│   │   │   ├── WorkerRepository.cs
│   │   │   └── UnitOfWork.cs
│   │   ├── Identity/                  # Auth implementation
│   │   │   ├── ApplicationUser.cs
│   │   │   └── IdentityService.cs
│   │   ├── Services/                  # External services
│   │   │   ├── EmailService.cs
│   │   │   └── JwtService.cs
│   │   ├── Migrations/                # EF Core migrations
│   │   └── JobFinder.Infrastructure.csproj
│   │
│   └── JobFinder.Tests/               # Unit Tests
│       ├── Application.Tests/
│       ├── Infrastructure.Tests/
│       └── JobFinder.Tests.csproj
│
├── client/                      # React Frontend
│   ├── public/                  # Static assets
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/                 # API clients
│   │   │   ├── authApi.ts
│   │   │   └── workerApi.ts
│   │   ├── components/          # UI Components
│   │   │   ├── common/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── workers/
│   │   │   │   ├── WorkerCard.tsx
│   │   │   │   └── WorkerForm.tsx
│   │   │   └── jobs/
│   │   ├── pages/               # Application pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── WorkerListPage.tsx
│   │   │   └── WorkerDetailPage.tsx
│   │   ├── store/               # State management
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── workerSlice.ts
│   │   │   └── store.ts
│   │   ├── types/               # TypeScript types
│   │   │   └── workerTypes.ts
│   │   ├── utils/               # Utilities
│   │   │   └── authUtils.ts
│   │   ├── App.tsx              # Main component
│   │   ├── index.tsx            # Entry point
│   │   └── react-app-env.d.ts
│   ├── .env                     # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── docker/                      # Docker configurations
│   ├── api.Dockerfile
│   └── client.Dockerfile
│
├── scripts/                     # Utility scripts
│   ├── database/
│   │   └── seed_db.sh
│   └── deploy.sh
│
├── docker-compose.yml           # Full stack definition
├── .gitignore
├── JobFinder.sln                # .NET Solution file
├── README.md                    # Project documentation
└── SECURITY.md




dotnet ef database update
  --project src/JobFinder.Infrastructure
  --startup-project src/JobFinder.API
  --connection "Host=localhost;Port=5432;Database=jobfinder;Username=postgres;Password=postgres"