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