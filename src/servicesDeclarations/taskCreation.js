import {db} from "../db.js"

 export async function setTaskCreation(args) {
    console.log("💡 Executando função real da criação de tarefas...");

     if (!args.name) {
        throw new Error("Missing task name");
    }

    if (!args.priority) {
        throw new Error("Missing priority");
    }

    let task = {
        name: args.name,
        description: args.description ?? null,
        priority: args.priority,
        tags: args.tags ?? [],
        estimated_hours: args.estimated_hours ?? null,
        assignee: args.assignee ?? null,
        dueDate: args.dueDate ?? null,
        space: args.space ?? null
    }

     await saveTaskDb(task);
     await saveTagDb(task)

     return task
}

async function saveTaskDb(task) {
  console.log("Estou a entrar na db para guardar task")
  await db.query(
    'INSERT INTO tasks (name, description, priority, estimated_hours, assignee, dueDate, space) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [task.name, task.description, task.priority, task.estimated_hours, task.assignee, task.dueDate, task.space]
  );
}

async function saveTagDb(task) {
console.log("Estou a entrar na db para guardar tags")
if (task.tags.length > 0) {
  for (let i =0; i <= (task.tags.length); i++) {
      await db.query(
      'INSERT IGNORE INTO tags (name) VALUES (?)',
      [task.tags[i]]
    );
    }
  }
}


