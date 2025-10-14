# JobFinder - Платформа поиска работы

Современная платформа для поиска работы с архитектурой .NET + React.

## 🚀 Быстрый старт

### Предварительные требования
- .NET 8.0 SDK
- Node.js 18+
- PostgreSQL 14+

### Запуск проекта

1. **Клонирование репозитория**
```bash
git clone <repository-url>
cd JobFinder
```

2. **Настройка базы данных**
```bash
# Создайте базу данных PostgreSQL
createdb jobfinder

# Примените миграции
dotnet ef database update --project src/JobFinder.Infrastructure --startup-project src/JobFinder.API
```

3. **Запуск API**
```bash
cd src/JobFinder.API
dotnet run
```

4. **Запуск клиента**
```bash
cd client
npm install
npm start
```

## 🏗️ Архитектура

Проект использует Clean Architecture с разделением на слои:

```
JobFinder/
├── src/
│   ├── JobFinder.API/           # Web API Layer
│   ├── JobFinder.Application/   # Business Logic Layer
│   ├── JobFinder.Core/          # Domain Layer
│   └── JobFinder.Infrastructure/# Infrastructure Layer
└── client/                      # React Frontend
```

## ✨ Основные улучшения

### Backend (.NET)
- ✅ **Clean Architecture** - правильное разделение слоев
- ✅ **CQRS Pattern** - разделение команд и запросов
- ✅ **Repository Pattern** - абстракция доступа к данным
- ✅ **DTO Pattern** - отдельные модели для API
- ✅ **Валидация данных** - Data Annotations
- ✅ **Swagger документация** - автоматическая генерация API docs
- ✅ **CORS настройки** - для работы с фронтендом
- ✅ **Обработка ошибок** - централизованная обработка исключений

### Frontend (React)
- ✅ **Material-UI** - современный UI фреймворк
- ✅ **TypeScript** - типизация
- ✅ **API клиенты** - структурированные запросы к API
- ✅ **Компонентная архитектура** - переиспользуемые компоненты
- ✅ **Роутинг** - React Router
- ✅ **Обработка состояний** - loading, error states

### База данных
- ✅ **Entity Framework Core** - ORM
- ✅ **Миграции** - версионирование схемы БД
- ✅ **PostgreSQL** - надежная СУБД

## 🔧 Дополнительные улучшения

### 1. Аутентификация и авторизация
- [ ] JWT токены
- [ ] Refresh токены
- [ ] Роли пользователей
- [ ] Защищенные маршруты

### 2. Поиск и фильтрация
- [ ] Elasticsearch для поиска
- [ ] Расширенные фильтры
- [ ] Пагинация результатов

### 3. Уведомления
- [ ] Email уведомления
- [ ] Push уведомления
- [ ] In-app уведомления

### 4. Тестирование
- [ ] Unit тесты
- [ ] Integration тесты
- [ ] E2E тесты

### 5. DevOps
- [ ] Docker контейнеризация
- [ ] CI/CD pipeline
- [ ] Мониторинг и логирование

### 6. Безопасность
- [ ] Rate limiting
- [ ] Input validation
- [ ] SQL injection protection
- [ ] XSS protection

## 📁 Структура проекта

```
JobFinder/
├── src/
│   ├── JobFinder.API/
│   │   ├── Controllers/         # API контроллеры
│   │   ├── Middleware/          # Пользовательские middleware
│   │   └── Program.cs           # Точка входа
│   ├── JobFinder.Application/
│   │   ├── Services/            # Бизнес-логика
│   │   ├── DTO/                 # Data Transfer Objects
│   │   └── Validators/          # Валидация
│   ├── JobFinder.Core/
│   │   ├── Models/              # Доменные модели
│   │   ├── Interfaces/          # Интерфейсы репозиториев
│   │   └── Enums/               # Перечисления
│   └── JobFinder.Infrastructure/
│       ├── Database/            # DbContext и конфигурация
│       ├── Repositories/        # Реализации репозиториев
│       └── Migrations/          # Миграции БД
└── client/
    ├── src/
    │   ├── components/          # React компоненты
    │   ├── pages/               # Страницы приложения
    │   ├── api/                 # API клиенты
    │   └── utils/               # Утилиты
    └── package.json
```

## 🛠️ Команды разработки

```bash
# Создание новой миграции
dotnet ef migrations add MigrationName --project src/JobFinder.Infrastructure --startup-project src/JobFinder.API

# Применение миграций
dotnet ef database update --project src/JobFinder.Infrastructure --startup-project src/JobFinder.API

# Запуск тестов
dotnet test

# Сборка проекта
dotnet build

# Очистка
dotnet clean
```

## 📝 API Endpoints

### Jobs
- `GET /api/jobs` - Получить все вакансии
- `GET /api/jobs/{id}` - Получить вакансию по ID
- `POST /api/jobs` - Создать новую вакансию
- `PUT /api/jobs/{id}` - Обновить вакансию
- `DELETE /api/jobs/{id}` - Удалить вакансию

### Workers
- `GET /api/workers` - Получить всех работников
- `GET /api/workers/{id}` - Получить работника по ID

### Auth
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/register` - Регистрация

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License.

## 🆘 Поддержка

Если у вас есть вопросы или проблемы, создайте issue в репозитории.