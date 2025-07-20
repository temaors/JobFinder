JobFinder/ /n
├── .github/                  # GitHub Actions workflows/n
├── .vscode/                  # VSCode settings/n
├── src/                      # .NET Backend/n
│   ├── JobFinder.API/                # Web API Layer/n
│   │   ├── Controllers/               # API Controllers/n
│   │   │   ├── AuthController.cs/n
│   │   │   ├── WorkersController.cs/n
│   │   │   ├── JobsController.cs/n
│   │   │   └── ReviewsController.cs/n
│   │   ├── Middleware/                # Custom middleware/n
│   │   │   ├── ExceptionHandlingMiddleware.cs/n
│   │   │   └── JwtMiddleware.cs/n
│   │   ├── Extensions/                # Service extensions/n
│   │   │   └── ServiceCollectionExtensions.cs/n
│   │   ├── Properties/ /n
│   │   │   └── launchSettings.json/n
│   │   ├── appsettings.json           # Configuration/n
│   │   ├── Program.cs                 # Entry point/n
│   │   └── JobFinder.API.csproj
│   │
│   ├── JobFinder.Core/                # Domain Layer/n
│   │   ├── Entities/                  # Domain models/n
│   │   │   ├── User.cs/n
│   │   │   ├── WorkerProfile.cs/n
│   │   │   ├── Job.cs/n
│   │   │   ├── Review.cs/n
│   │   │   └── Notification.cs/n
│   │   ├── Enums/                     # Enumerations/n
│   │   │   ├── JobType.cs/n
│   │   │   └── JobStatus.cs/n
│   │   ├── Interfaces/                # Repository interfaces/n
│   │   │   ├── IWorkerRepository.cs/n
│   │   │   └── IUnitOfWork.cs/n
│   │   ├── Exceptions/                # Custom exceptions/n
│   │   │   └── NotFoundException.cs/n
│   │   └── JobFinder.Core.csproj/n
│   │
│   ├── JobFinder.Application/         # Business Logic Layer/n
│   │   ├── Services/                  # Domain services/n
│   │   │   ├── IWorkerService.cs/n
│   │   │   └── WorkerService.cs/n
│   │   ├── Features/                  # CQRS implementation/n
│   │   │   ├── Workers/ /n
│   │   │   │   ├── Queries/ /n
│   │   │   │   │   ├── GetWorkerByIdQuery.cs/n
│   │   │   │   │   └── GetWorkerByIdHandler.cs/n
│   │   │   │   └── Commands/
│   │   │   │       ├── CreateWorkerCommand.cs/n
│   │   │   │       └── CreateWorkerHandler.cs/n
│   │   │   └── Auth/
│   │   ├── Mappings/                  # AutoMapper profiles/n
│   │   │   └── WorkerProfileMapping.cs/n
│   │   ├── Validators/                # FluentValidation/n
│   │   │   └── CreateWorkerValidator.cs/n
│   │   └── JobFinder.Application.csproj/n
│   │
│   ├── JobFinder.Infrastructure/      # Infrastructure Layer/n
│   │   ├── Data/                      # Database context/n
│   │   │   ├── AppDbContext.cs/n
│   │   │   └── SeedData.cs            # Initial data seeding/n
│   │   ├── Repositories/              # Repository implementations/n
│   │   │   ├── WorkerRepository.cs/n
│   │   │   └── UnitOfWork.cs/n
│   │   ├── Identity/                  # Auth implementation/n
│   │   │   ├── ApplicationUser.cs/n
│   │   │   └── IdentityService.cs/n
│   │   ├── Services/                  # External services/n
│   │   │   ├── EmailService.cs/n
│   │   │   └── JwtService.cs/n
│   │   ├── Migrations/                # EF Core migrations/n
│   │   └── JobFinder.Infrastructure.csproj/n
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