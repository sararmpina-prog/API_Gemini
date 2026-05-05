import { createTask, refineTaskService, summarizeTaskService, suggestTagsService, planSprintService} from "../services/taskService.js";


//post - create new task with ai
export const createTaskFromText = async (req, res) => {
     
    try {
        console.log("CONTROLLER")
        const text  = req.body.text;

        // Input validation
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
            });
        }


        const task = await createTask(text);
        console.log("A task é", task)

        res.status(201).json({
            success: true,
            data: task
        });

    } catch (error) {
        console.error('Error in /api/tasks/create:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};    

//post - refine existing task with ai
export const refineTask = async (req, res) => {
     
    try {
        console.log("CONTROLLER")
        const { task } = req.body;

        console.log("TASK controller", task)

        // Input validation
        if (!task) {
            return res.status(400).json({
                success: false,
                error: 'Task is required and must be a non-empty json'
            });
        }


        const refinedTask = await refineTaskService(task);

        res.status(201).json({
            success: true,
            data: refinedTask
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};    

//post - summarize existing task with ai
export const summarizeTask = async (req, res) => {
     
    try {
        console.log("CONTROLLER")
        const { task } = req.body;

        console.log("TASK controller", task)

        // Input validation
        if (!task) {
            return res.status(400).json({
                success: false,
                error: 'Task is required and must be a non-empty json'
            });
        }

        const summarizedTask = await summarizeTaskService(task);

        res.status(201).json({
            success: true,
            data: summarizedTask
        });

    } catch (error) {
        console.error('Error in /api/tasks/summarize:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};  

//post - suggest tags for task with ai
export const suggestTags = async (req, res) => {
     
    try {
        console.log("CONTROLLER")
        const { task } = req.body;

        console.log("TASK controller", task)

        // Input validation
        if (!task) {
            return res.status(400).json({
                success: false,
                error: 'Task is required and must be a non-empty json'
            });
        }

        const completedTags = await suggestTagsService(task);

        res.status(201).json({
            success: true,
            data: completedTags
        });

    } catch (error) {
        console.error('Error in /api/tasks/suggest-tags:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};  


//get - plan sprint
export const planSprint = async (req, res) => {
     
    try {
        console.log("CONTROLLER do plan sprint")
        const { text } = req.body;

        console.log("Text controller", text)

        // Input validation
        if (!text) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty json'
            });
        }

        const planSprint = await planSprintService(text);

        res.status(201).json({
            success: true,
            data: planSprint
        });

    } catch (error) {
        console.error('Error in /api/tasks/planSprint:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};  


//post - breakdown tasks
export const generateTaskBreakdown = async (req, res) => {
     
    try {
        console.log("CONTROLLER do plan sprint")
        const { text } = req.body;

        console.log("Text controller", text)

        if (!text) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty json'
            });
        }

        const subtasks = await generateTaskBreakdown(text);

        res.status(201).json({
            success: true,
            data: subtasks
        });

    } catch (error) {
        console.error('Error in /api/tasks/autoSplitService', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};  