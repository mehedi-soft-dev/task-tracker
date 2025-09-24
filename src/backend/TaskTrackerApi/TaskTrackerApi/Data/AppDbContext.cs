using Microsoft.EntityFrameworkCore;
using TaskTrackerAPI.Models;

namespace TaskTrackerAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<TaskItem> TaskItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure BaseEntity properties for all entities
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (entityType.ClrType.IsSubclassOf(typeof(BaseEntity)))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .Property<DateTime>("CreatedAt")
                    .IsRequired();

                modelBuilder.Entity(entityType.ClrType)
                    .Property<DateTime>("ModifiedAt")
                    .IsRequired();
            }
        }

        // Configure TaskItem specific properties
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

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Update ModifiedAt for all modified BaseEntity entities
        var entries = ChangeTracker.Entries<BaseEntity>()
            .Where(e => e.State == EntityState.Modified || e.State == EntityState.Added);

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Modified)
            {
                entry.Entity.ModifiedAt = DateTime.UtcNow;
            }
            else if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;
                entry.Entity.ModifiedAt = DateTime.UtcNow;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }

    public static void SeedData(AppDbContext context)
    {
        if (!context.TaskItems.Any())
        {
            context.TaskItems.AddRange(
                new TaskItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Setup project",
                    Description = "Initialize the Task Tracker project with GraphQL and PostgreSQL",
                    Status = TaskItemStatus.Completed,
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    ModifiedAt = DateTime.UtcNow.AddDays(-2)
                },
                new TaskItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Implement GraphQL API",
                    Description = "Add GraphQL queries and mutations for task management",
                    Status = TaskItemStatus.Completed,
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    ModifiedAt = DateTime.UtcNow.AddDays(-1)
                },
                new TaskItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Add frontend",
                    Description = "Create React frontend with Relay for GraphQL integration",
                    Status = TaskItemStatus.Pending,
                    CreatedAt = DateTime.UtcNow,
                    ModifiedAt = DateTime.UtcNow
                },
                new TaskItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Write unit tests",
                    Description = "Add comprehensive unit tests for API endpoints",
                    Status = TaskItemStatus.Pending,
                    CreatedAt = DateTime.UtcNow,
                    ModifiedAt = DateTime.UtcNow
                },
                new TaskItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Deploy to production",
                    Description = "Deploy the application to cloud hosting service",
                    Status = TaskItemStatus.Pending,
                    CreatedAt = DateTime.UtcNow,
                    ModifiedAt = DateTime.UtcNow
                }
            );
            context.SaveChanges();
        }
    }
}