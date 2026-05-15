import * as taskService from "../services/taskService.js"


//get - return all tasks from database 
export const getAllTasks = async (req, res) => {

    
    try {
        const tasks = await taskService.getAllTasksDb();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error getting tasks from database"});
    }
}
