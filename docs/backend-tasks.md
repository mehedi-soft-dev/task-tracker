# Backend Implementation Tasks - Simplified (.NET Core + GraphQL + PostgreSQL)

## Phase 1: Project Setup (15 minutes)

### Create Project
- [x] Create new Web API project: `dotnet new webapi -n TaskTrackerAPI`
- [x] Install required NuGet packages:
  ```bash
  dotnet add package HotChocolate.AspNetCore
  dotnet add package HotChocolate.Data.EntityFramework
  dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
  dotnet add package Microsoft.EntityFrameworkCore.Design
  ```

### Project Structure
- [x] Create folder structure in single project:
  ```
  TaskTrackerAPI/
  ├── Models/
  │   └── Task.cs
  ├── Data/
  │   └── AppDbContext.cs
  ├── GraphQL/
  │   ├── Queries/
  │   │   └── Query.cs
  │   ├── Mutations/
  │   │   └── Mutation.cs
  │   └── Types/
  │       └── TaskType.cs
  ├── Program.cs
  └── appsettings.json
  ```

## Phase 2: Data Models & Database (20 minutes)

### Create Task Model
- [x] Create `Models/TaskItem.cs` (renamed to avoid conflict with System.Threading.Tasks.Task):
- [x] Create `Models/BaseEntity.cs` for common fields:
  ```csharp
  namespace TaskTrackerAPI.Models;

  // BaseEntity.cs
  public abstract class BaseEntity
  {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public DateTime ModifiedAt { get; set; }
  }

  // TaskItem.cs
  public class TaskItem : BaseEntity
  {
      public string Title { get; set; } = string.Empty;
      public string Description { get; set; } = string.Empty;
      public TaskItemStatus Status { get; set; } = TaskItemStatus.Pending;
  }

  public enum TaskItemStatus
  {
      Pending,
      Completed
  }
  ```

### Create DbContext
- [x] Create `Data/AppDbContext.cs`:
  ```csharp
  using Microsoft.EntityFrameworkCore;
  using TaskTrackerAPI.Models;

  namespace TaskTrackerAPI.Data;

  public class AppDbContext : DbContext
  {
      public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options) { }

      public DbSet<TaskItem> Tasks { get; set; }

      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
          modelBuilder.Entity<TaskItem>(entity =>
          {
              entity.HasKey(e => e.Id);
              entity.Property(e => e.Title)
                  .IsRequired()
                  .HasMaxLength(200);
              entity.Property(e => e.Description)
                  .HasMaxLength(1000);
          });
      }

      public override async System.Threading.Tasks.Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
      {
          var entries = ChangeTracker.Entries<BaseEntity>()
              .Where(e => e.State == EntityState.Modified || e.State == EntityState.Added);

          foreach (var entry in entries)
          {
              if (entry.State == EntityState.Modified)
                  entry.Entity.ModifiedAt = DateTime.UtcNow;
              else if (entry.State == EntityState.Added)
              {
                  entry.Entity.CreatedAt = DateTime.UtcNow;
                  entry.Entity.ModifiedAt = DateTime.UtcNow;
              }
          }

          return await base.SaveChangesAsync(cancellationToken);
      }
  }
  ```

### Configure Connection String
- [x] Update `appsettings.json`:
  ```json
  {
    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Database=TaskTracker;Username=postgres;Password=password"
    },
    "Logging": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft.AspNetCore": "Warning"
      }
    }
  }
  ```

## Phase 3: GraphQL Implementation (30 minutes)

### Create GraphQL Query
- [x] Create `GraphQL/Queries/Query.cs`:
  ```csharp
  using Microsoft.EntityFrameworkCore;
  using TaskTrackerAPI.Data;
  using TaskTrackerAPI.Models;

  namespace TaskTrackerAPI.GraphQL.Queries;

  public class Query
  {
      [UseProjection]
      [UseFiltering]
      [UseSorting]
      public IQueryable<TaskItem> GetAllTasks([Service] AppDbContext context)
          => context.Tasks;

      public async Task<TaskItem?> GetTaskById(
          Guid id,
          [Service] AppDbContext context)
          => await context.Tasks.FindAsync(id);
  }
  ```

### Create GraphQL Mutations
- [x] Create `GraphQL/Mutations/Mutation.cs`:
  ```csharp
  using TaskTrackerAPI.Data;
  using TaskTrackerAPI.Models;

  namespace TaskTrackerAPI.GraphQL.Mutations;

  public class Mutation
  {
      public async Task<TaskItem> CreateTask(
          string title,
          string description,
          [Service] AppDbContext context)
      {
          var task = new TaskItem
          {
              Title = title,
              Description = description,
              Status = TaskItemStatus.Pending
          };

          context.Tasks.Add(task);
          await context.SaveChangesAsync();
          return task;
      }

      public async Task<TaskItem?> UpdateTaskStatus(
          Guid id,
          TaskItemStatus status,
          [Service] AppDbContext context)
      {
          var task = await context.Tasks.FindAsync(id);
          if (task == null)
              throw new GraphQLException("Task not found");

          task.Status = status;
          await context.SaveChangesAsync();
          return task;
      }
  }
  ```

### Create Task Type (Optional - for custom field configuration)
- [x] Create `GraphQL/Types/TaskType.cs`:
  ```csharp
  using TaskTrackerAPI.Models;

  namespace TaskTrackerAPI.GraphQL.Types;

  public class TaskType : ObjectType<TaskItem>
  {
      protected override void Configure(IObjectTypeDescriptor<TaskItem> descriptor)
      {
          descriptor.Field(f => f.Id);
          descriptor.Field(f => f.Title);
          descriptor.Field(f => f.Description);
          descriptor.Field(f => f.Status);
          descriptor.Field(f => f.CreatedAt);
          descriptor.Field(f => f.ModifiedAt);
      }
  }
  ```

## Phase 4: Configure Services & Middleware (20 minutes)

### Update Program.cs
- [x] Configure all services in `Program.cs`:
  ```csharp
  using Microsoft.EntityFrameworkCore;
  using TaskTrackerAPI.Data;
  using TaskTrackerAPI.GraphQL.Queries;
  using TaskTrackerAPI.GraphQL.Mutations;

  var builder = WebApplication.CreateBuilder(args);

  // Add DbContext
  builder.Services.AddDbContext<AppDbContext>(options =>
      options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

  // Add GraphQL
  builder.Services
      .AddGraphQLServer()
      .AddQueryType<Query>()
      .AddMutationType<Mutation>()
      .AddProjections()
      .AddFiltering()
      .AddSorting();

  // Add CORS
  builder.Services.AddCors(options =>
  {
      options.AddPolicy("AllowAll",
          builder => builder
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
  });

  var app = builder.Build();

  // Configure middleware
  app.UseCors("AllowAll");
  app.MapGraphQL();

  // Migrate database on startup (development only)
  using (var scope = app.Services.CreateScope())
  {
      var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
      dbContext.Database.Migrate();
  }

  app.Run();
  ```

## Phase 5: Database Migration & Seeding (15 minutes)

### Create Initial Migration
- [x] Run migration commands:
  ```bash
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

### Add Seed Data (Optional)
- [x] Add seed method to `AppDbContext.cs`:
  ```csharp
  public static void SeedData(AppDbContext context)
  {
      if (!context.Tasks.Any())
      {
          context.Tasks.AddRange(
              new TaskItem {
                  Id = Guid.NewGuid(),
                  Title = "Setup project",
                  Description = "Initialize the Task Tracker project",
                  Status = TaskItemStatus.Completed
              },
              new TaskItem {
                  Id = Guid.NewGuid(),
                  Title = "Implement GraphQL",
                  Description = "Add GraphQL queries and mutations",
                  Status = TaskItemStatus.Pending
              },
              new TaskItem {
                  Id = Guid.NewGuid(),
                  Title = "Add frontend",
                  Description = "Create React frontend with Relay",
                  Status = TaskItemStatus.Pending
              }
          );
          context.SaveChanges();
      }
  }
  ```

- [x] Call seed method in Program.cs after migration:
  ```csharp
  using (var scope = app.Services.CreateScope())
  {
      var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
      dbContext.Database.Migrate();
      AppDbContext.SeedData(dbContext);
  }
  ```

## Phase 6: Testing & Verification (10 minutes)

### Test GraphQL Endpoints
- [x] Run the application: `dotnet run`
- [x] Open GraphQL Playground at `http://localhost:5000/graphql`
- [x] Test getAllTasks query:
  ```graphql
  query {
    getAllTasks {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
  ```

- [x] Test createTask mutation:
  ```graphql
  mutation {
    createTask(
      title: "New Task"
      description: "Task description"
    ) {
      id
      title
      description
      status
    }
  }
  ```

- [x] Test updateTaskStatus mutation:
  ```graphql
  mutation {
    updateTaskStatus(
      id: "YOUR-TASK-ID"
      status: COMPLETED
    ) {
      id
      status
      updatedAt
    }
  }
  ```

## Optional Enhancements (if time permits)

### Add Input Validation
- [ ] Add data annotations to Task model
- [ ] Add validation in mutations before saving

### Add Error Handling
- [ ] Create custom exception middleware
- [ ] Add try-catch blocks in mutations
- [ ] Return meaningful error messages

### Add Logging
- [ ] Configure console logging
- [ ] Log database operations
- [ ] Log GraphQL requests

## Project Completion Checklist
- [x] ✅ GraphQL schema defined with TaskItem entity
- [x] ✅ getAllTasks query implemented
- [x] ✅ createTask mutation implemented
- [x] ✅ updateTaskStatus mutation implemented
- [x] ✅ PostgreSQL database configured with Entity Framework
- [x] ✅ CORS configured for frontend access
- [x] ✅ GraphQL Playground accessible