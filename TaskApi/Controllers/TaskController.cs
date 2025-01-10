using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private static List<TaskItem> Tasks = new List<TaskItem>();

    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(Tasks);
    }

    [HttpPost]
    public IActionResult AddTask([FromBody] TaskItem task)
    {
        Tasks.Add(task);
        return Ok(task);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, [FromBody] TaskItem updatedTask)
    {
        var task = Tasks.FirstOrDefault(t => t.Id == id);
        if (task == null)
        {
            return NotFound($"Task with ID {id} not found.");
        }

        task.Name = updatedTask.Name;
        task.IsComplete = updatedTask.IsComplete;

        return Ok(task);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
    var task = Tasks.FirstOrDefault(t => t.Id == id);
    if (task == null)
    {
        return NotFound();
    }

    Tasks.Remove(task);
    return NoContent();
    }

}

public class TaskItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsComplete { get; set; }
}
