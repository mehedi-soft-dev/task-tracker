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

        context.TaskItems.Add(task);
        await context.SaveChangesAsync();
        return task;
    }

    public async Task<TaskItem?> UpdateTaskStatus(
        Guid id,
        TaskItemStatus status,
        [Service] AppDbContext context)
    {
        var task = await context.TaskItems.FindAsync(id);
        if (task == null)
            throw new GraphQLException("Task not found");

        task.Status = status;
        await context.SaveChangesAsync();
        return task;
    }

    public async Task<TaskItem?> UpdateTask(
        Guid id,
        string title,
        string description,
        [Service] AppDbContext context)
    {
        var task = await context.TaskItems.FindAsync(id);
        if (task == null)
            throw new GraphQLException("Task not found");

        task.Title = title;
        task.Description = description;
        task.ModifiedAt = DateTime.UtcNow;

        await context.SaveChangesAsync();
        return task;
    }

    public async Task<bool> DeleteTask(
        Guid id,
        [Service] AppDbContext context)
    {
        var task = await context.TaskItems.FindAsync(id);
        if (task == null)
            throw new GraphQLException("Task not found");

        context.TaskItems.Remove(task);
        await context.SaveChangesAsync();
        return true;
    }
}