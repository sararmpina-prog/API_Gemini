import {db} from "../db.js"
import { validateDescription } from "../middlewares/validateDescription.js";
import { validatePriority } from "../middlewares/validatePriority.js";
import { validateName } from "../middlewares/validateName.js"; 

//Update task and check if task exists in DB
 export async function setTaskUpdate(args) {

try {
  console.log("💡 Executando função real da atualização de tarefas...");

    const existingTask = await getTaskById(args.id);

    if (!existingTask) {
      return { success: false, error: "Task not found" };
    }

    let name = validateName(args.name)
    let priority = validatePriority(args.priority)
    let description = validateDescription(args.description)


    let task = {
        name: name ?? existingTask.name,
        description: description ?? existingTask.description,
        priority: priority ?? existingTask.priority,
        tags: args.tags ?? existingTask.tags,
        estimated_hours: args.estimated_hours ?? existingTask.estimated_hours,
        assignee: args.assignee ?? existingTask.assignee,
        dueDate: args.dueDate ?? existingTask.dueDate,
        space: args.space ?? existingTask.space
    }

     const result = await updateTaskDb(args.id, task);

     if (!result.success) {
        return result;
    }

     return task
} catch (error) {
  console.error("Error in setTaskUpdate", error.message);

      return {
        success: false,
        error: error.message
      };
}
    
}

//Update task in DB
async function updateTaskDb(id, task) {

  console.log("Estou a entrar na db para actualizar task")

  const [result] = await db.query(
     "UPDATE tasks SET name = ?, description = ?, priority = ?, estimated_hours = ?, assignee = ?, dueDate = ?, space = ? WHERE id = ?",
    [task.name, task.description, task.priority, task.estimated_hours, task.assignee, task.dueDate, task.space, id]
  );

  if (result.affectedRows === 0) {
    return { success: false, error: "Task not found" };
  }

  return { success: true };
}

//Select task from BD
async function getTaskById(id) {
  console.log("Estou a entrar na db para ir buscar a tarefa existente")
  const [rows] = await db.query(
     "SELECT * from tasks WHERE id = ?",
    [id]);

  return rows[0]   
  
}