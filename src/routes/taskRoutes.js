import express from "express"
import * as taskController from '../controllers/taskController.js'

const router = express.Router()

router.post("/tasks/create", taskController.createTaskFromText);
router.post("/tasks/refine", taskController.refineTask);
router.post("/tasks/summarize", taskController.summarizeTask);
router.post("/tasks/suggest-tags", taskController.suggestTags);
router.get("/tasks/planSprint", taskController.planSprint)
router.post("/tasks/generateTaskBreakdown", taskController.generateTaskBreakdown)

console.log("TASK ROUTES LOADED");

export default router; 









//task id and tags (devolução)

//post task especifico se nao para começar so refinar 
//sumarize - faz me o sumario para a descrição ser mais resumida do tipo jira ou clickup (apenas 1 frase)
//suggest tags - com base nesta tarefa quais sao as tags que devem pertencer

// Criar prompt  - para estes 4 endpoints (testar no chat)
//Fazer funções que fazem isto 
//recebe JSON devolve JSON 
//objeto da task - para JSON para prompt (mock data)

//Esqueleto API
//Routes - Controllers - Serviços


//Pode vir vazio ou dar erro 