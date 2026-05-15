import {db} from "../db.js"


//Função criar nova tarefa (parametros obrigatório: nome tarefa)
 export async function setTaskCreation(args) {
    console.log("💡 Executando função real da criação de tarefas...");
  try {
    let name = validateName(args.name)
    let priority = validatePriority(args.priority)

    let task = {
        name: name,
        description: args.description ?? null,
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

//guardar na BD as novas tarefas - retornar ID (permite criar tarefa e depois atualizar a mesma)
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

//Caso haja tags (se duplicadas ignorar)
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

//Extra ao SystemPrompt - já explicito tudo isto

//Validar nome - existe; não são só números, não é código, e tamanho
function validateName(name) {
  const clean = name.trim();

  if (!clean) {
    throw new Error ("Task can not be empty")
  }

  //Não ser só números
  if (/^\d+$/.test(clean)) {
    throw new Error ("Task name cannot be just numbers")
  }

  //Bloquear código
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


//Validar que as prioridades são só estas
const priorities = ["Urgente", "Alta", "Normal", "Baixa"];

function validatePriority(priority) {
  const clean = String(priority ?? "").trim();

  if (!priorities.includes(clean)) {
    throw new Error ("Priority can only be Urgente, Alta, Normal, Baixa")
  }

  return clean;
}