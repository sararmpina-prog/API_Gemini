import {db} from "../db.js"


//Eliminar tarefa e validação se não existir (mensagem de erro)
 export async function setTaskDelete(id) {
    console.log("💡 Executando função real da eliminação de tarefas...");

    const result = await deleteTaskDb(id);
    console.log("resultado", result)

    if (!result.success) {
      console.log("Entre aqui resultado affected rows igual a zero")
      console.log("resultado", result)
      return result;
    }

     return {
        success: true,
        deleted_task_id: id
    };
}


//Eliminar tarefa da BD
async function deleteTaskDb(id) {
  console.log("Estou a entrar na db para eliminar task")
  const [result] = await db.query(
    "DELETE FROM tasks WHERE id = ?",
      [id]);

  if (result.affectedRows === 0) {
    console.log("Entre aqui resultado affected rows igual a zero")
    return { success: false, error: "Task not found" };
  }

  return { success: true };    
}