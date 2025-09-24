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
        => context.TaskItems;

    public async Task<TaskItem?> GetTaskById(
        Guid id,
        [Service] AppDbContext context)
        => await context.TaskItems.FindAsync(id);
}