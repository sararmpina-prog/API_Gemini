import {db} from "../db.js"

 export async function setTaskUpdate(args) {
    console.log("💡 Executando função real da atualização de tarefas...");

    const existingTask = await getTaskById(args.id);

    if (!existingTask) {
      throw new Error("Task not found");
    }


    let task = {
        name: args.name ?? existingTask.name,
        description: args.description ?? existingTask.description,
        priority: args.priority ?? existingTask.priority,
        tags: args.tags ?? existingTask.tags,
        estimated_hours: args.estimated_hours ?? existingTask.estimated_hours,
        assignee: args.assignee ?? existingTask.assignee,
        dueDate: args.dueDate ?? existingTask.dueDate,
        space: args.space ?? existingTask.space
    }

     await updateTaskDb(args.id, task);

     return task
}

async function updateTaskDb(id, task) {
  console.log("Estou a entrar na db para actualizar task")
  await db.query(
     "UPDATE tasks SET name = ?, description = ?, priority = ?, estimated_hours = ?, assignee = ?, dueDate = ?, space = ? WHERE id = ?",
    [task.name, task.description, task.priority, task.estimated_hours, task.assignee, task.dueDate, task.space, id]
  );
}

async function getTaskById(id) {
  console.log("Estou a entrar na db para ir buscar a tarefa existente")
  const [rows] = await db.query(
     "SELECT * from tasks WHERE id = ?",
    [id]);

  return rows[0]   
  
}