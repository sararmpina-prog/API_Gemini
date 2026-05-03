import express from "express"
import * as chatController from '../controllers/chatController.js'

const router = express.Router()

router.post("/clickbot/chat", chatController.getHistory);

router.get("/clickbot/chat/stream", chatController.streamMessage)

// Non-streaming test endpoint for Thunder Client
router.get("/clickbot/chat/test", chatController.testMessage)


console.log("CHAT ROUTES LOADED");

export default router; 


//Fazer uma rota GET/stream
//Endpoint chamar dados do gemini e vai responder essa stream e ver na consola


//Recebe os chunks todos concatena e armazena na base de dados 
//Exercicio 1: receber stream e guardar na base de dados quando terminar
//Tabela chat_history:  user_message, user_id, ai_response, id, id_chat 


//Passo 1: criar BD, criar tabela Passo 1 - Criar tabela na bd
//Passo 2: Novo endpoint (chat/stream)
//Passo 3: vai fazer um stream e receber na consola
//Passo 4: Armazenar 