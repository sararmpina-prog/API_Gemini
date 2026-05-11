import express from "express"
import * as taskController from '../controllers/taskController.js'

const router = express.Router()

router.get("/", taskController.getAllTasks);


console.log("CHAT ROUTES LOADED");

export default router; 