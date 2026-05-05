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




