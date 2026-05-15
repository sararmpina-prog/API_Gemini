import {db} from '../db.js'

//Se não houver tarefas urgentes devolve [] (testado)
export async function getUrgentTasks() {
  
  
  let [rows] = await db.query(
    "SELECT * FROM tasks WHERE priority = 'Urgente'"
  );

  return {
    type: "tasks",
    tasks: rows
  }
}