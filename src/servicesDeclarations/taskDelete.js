import {db} from "../db.js"

 export async function setTaskDelete(id) {
    console.log("💡 Executando função real da eliminação de tarefas...");

     await deleteTaskDb(id);

     return {
        success: true,
        deleted_task_id: id
    };
}

async function deleteTaskDb(id) {
  console.log("Estou a entrar na db para eliminar task")
  await db.query(
    "DELETE FROM tasks WHERE id = ?",
      [id]);
}