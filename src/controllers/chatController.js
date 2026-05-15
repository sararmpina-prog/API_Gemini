import {sendPromptService} from "../services/chatService.js";



//post - userPrompt  
export const sendPrompt = async (req, res) => {
     
    try {
        console.log(req.body);
        console.log("CONTROLLER do sendPrompt")
        const  {text}  = req.body;

        console.log("o texto do prompt é", text)

        // Input validation
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
            });
        }


        const result = await sendPromptService(text);
        
        console.log("A resposta ao prompt é", result)

        //Devolve antes mensagem de erro 
        // if (result?.error === "Task not found") {
        //     return res.status(404).json(result);
        // }

        res.status(200).json({data: result});

    } catch (error) {
        console.error('Error in /api/clickbot/chat:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};    

// Test endpoint
export const testMessage = async (req, res) => {
    res.status(200).json({ success: true, message: 'Test endpoint working' });
};






