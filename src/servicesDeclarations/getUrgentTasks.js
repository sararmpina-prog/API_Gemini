import {db} from '../db.js'

//Get urgent tasks if none returns [] (tested)
export async function getUrgentTasks() {
  
  
  let [rows] = await db.query(
    "SELECT * FROM tasks WHERE priority = 'Urgente'"
  );

  return {
    type: "tasks",
    tasks: rows
  }
}