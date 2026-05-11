import express from "express"
import * as chatController from '../controllers/chatController.js'

const router = express.Router()

router.post("/clickbot/chat", chatController.sendPrompt);





// Non-streaming test endpoint for Thunder Client
router.get("/clickbot/chat/test", chatController.testMessage)


console.log("CHAT ROUTES LOADED");

export default router; 

