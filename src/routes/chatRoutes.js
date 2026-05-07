import express from "express"
import * as chatController from '../controllers/chatController.js'

const router = express.Router()

router.get("/clickbot/chat/stream", chatController.streamMessage)
router.post("/clickbot/chat", chatController.sendPrompt);
router.post("/clickbot/summary/stream", chatController.streamSummary)
router.post("/clickbot/chat/bugs", chatController.classifyBugs)
router.post("/clickbot/chat/planner", chatController.createPlanner)


// Non-streaming test endpoint for Thunder Client
router.get("/clickbot/chat/test", chatController.testMessage)


console.log("CHAT ROUTES LOADED");

export default router; 

