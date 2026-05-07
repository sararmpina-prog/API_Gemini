
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
  return db.query(
    'INSERT INTO tasks (name, description, priority, estimated_hours) VALUES (?, ?, ?, ?)',
    [task.name, task.description, task.priority, task.estimated_hours]
  );
}

async function saveTagDb(task) {

  for (let i =0; i < (task.tag.length); i++) {
    return db.query(
    'INSERT INTO tags (name) VALUES (?)',
    [task.tags]
  );
  }

}


