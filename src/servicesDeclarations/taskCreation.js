import {db} from "../db.js"


//Create new tasks (mandatory parameters name)
 export async function setTaskCreation(args) {
    console.log("💡 Executando função real da criação de tarefas...");
  try {
    let name = validateName(args.name)
    let priority = validatePriority(args.priority)
    let description = validateDescription(args.description)

    let task = {
        name: name,
        description: description ?? null,
        priority: priority,
        tags: args.tags ?? [],
        estimated_hours: args.estimated_hours ?? null,
        assignee: args.assignee ?? null,
        dueDate: args.dueDate ?? null,
        space: args.space ?? null
    }

    const savedTask = await saveTaskDb(task);
     await saveTagDb(task)

     return savedTask
     } catch (error) {
      console.error("Error in setTaskCreation:", error.message);

      return {
        success: false,
        error: error.message
      };

     }
} 

//save new task in BD  - return id (allows to create and then update)
async function saveTaskDb(task) {
  console.log("Estou a entrar na db para guardar task")
  const [result] = await db.query(
    'INSERT INTO tasks (name, description, priority, estimated_hours, assignee, dueDate, space) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [task.name, task.description, task.priority, task.estimated_hours, task.assignee, task.dueDate, task.space]
  );

   return {
    id: result.insertId, 
    ...task
  };
}

//If there's tags - if duplicated ignore
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

//Extra validations to SystemPrompt 

//Validate task name eixts, length, no code and no numbers
function validateName(name) {
  const clean = name.trim();

  if (!clean) {
    throw new Error ("Task can not be empty")
  }

  //No numbers
  if (/^\d+$/.test(clean)) {
    throw new Error ("Task name cannot be just numbers")
  }

  //Block code
  const codePatterns = [
    /```/,
    /def\s+\w+\s*\(/,
    /function\s+\w+\s*\(/,
    /class\s+\w+/,
    /import\s+\w+/,
    /<script>/i,
    /<\/script>/i
  ];

  if (codePatterns.some(p => p.test(clean))) {
    throw new Error("Task name cannot contain code");
  }

  if (clean.length > 100) {
    throw new Error ("Task name too long. Maximum 100 caracteres")
  }

  return clean;
}


//Validate priorities are this ones
const priorities = ["Urgente", "Alta", "Normal", "Baixa"];

function validatePriority(priority) {
  const clean = String(priority ?? "").trim();

  if (!priorities.includes(clean)) {
    throw new Error ("Priority can only be Urgente, Alta, Normal, Baixa")
  }

  return clean;
}

const MAX_DESCRIPTION_LENGTH = 250;

//Validate description length
function validateDescription(description) {

  if (!description) return null;

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    throw new Error(
      `Descrição demasiado longa. Máximo permitido: ${MAX_DESCRIPTION_LENGTH} caracteres.`
    );
  }

  return description;
}