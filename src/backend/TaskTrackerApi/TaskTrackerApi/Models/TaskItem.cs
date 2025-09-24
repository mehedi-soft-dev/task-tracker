namespace TaskTrackerAPI.Models;

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