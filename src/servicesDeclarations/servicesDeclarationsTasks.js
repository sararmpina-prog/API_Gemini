import {db} from "../db.js"

 export async function setTaskCreation(name, description, priority, tags, estimated_hours) {
    console.log("💡 Executando função real da criação de tarefas...");
    let task = {
        name: name,
        description: description,
        priority: priority,
        tags: tags,
        estimated_hours: estimated_hours
    }

     await saveTaskDb(task);
     await saveTagDb(task)

     return task
}

async function saveTaskDb(task) {
  console.log("Estou a entrar na db para guardar task")
  await db.query(
    'INSERT INTO tasks (name, description, priority, estimated_hours) VALUES (?, ?, ?, ?)',
    [task.name, task.description, task.priority, task.estimated_hours]
  );
}

async function saveTagDb(task) {
console.log("Estou a entrar na db para guardar tags")
  for (let i =0; i <= (task.tags.length); i++) {
    await db.query(
    'INSERT IGNORE INTO tags (name) VALUES (?)',
    [task.tags[i]]
  );
  }
}


