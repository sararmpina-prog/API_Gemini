import {getHistoryService, streamMessageService} from "../services/chatService.js";

//post - userPrompt to get history 
export const getHistory = async (req, res) => {
     
    try {
        console.log("CONTROLLER do getHistory")
        const { text } = req.body;

        // Input validation
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
            });
        }


        const history = await getHistoryService(text);
        console.log("O histórico é", history)

        res.status(201).json({
            success: true,
            data: history
        });

    } catch (error) {
        console.error('Error in /api/clickbot/chat:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};    



//get - stream message from AI and store in BD
export const streamMessage = async (req, res) => {
     
    try {
        console.log("CONTROLLER do streamMessage")

        const text = req.query.message || "Olá, Gemini 3!";
        console.log("TEST UTF8:", "ação, você, informação");
        

         // 1. Headers fundamentais para Streaming (SSE)
            res.setHeader('Content-Type', 'text/event-stream', 'charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('X-Accel-Buffering', 'no'); 
            res.flushHeaders?.();


        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
            });
        }


        await streamMessageService(text, res);
      

    } catch (error) {

        console.error('Error in /api/clickbot/chat/stream:', error);

        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};    

// Non-streaming test endpoint for Thunder Client
export const testMessage = async (req, res) => {
    try {
        console.log("CONTROLLER do testMessage")
        
        const text = req.query.message || "Olá, Gemini 3!";
        
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
            });
        }

        // Collect all chunks and return as complete response
        let fullResponse = '';
        const mockRes = {
            write: (data) => {
                try {
                    const parsed = JSON.parse(data.replace('data: ', ''));
                    if (parsed.text) {
                        fullResponse += parsed.text;
                    }
                } catch (e) {
                    // Ignore parsing errors
                }
            },
            end: () => {
                // Don't end here - let the controller handle it
            }
        };

        await streamMessageService(text, mockRes);

        res.status(200).json({
            success: true,
            data: {
                message: text,
                response: fullResponse
            }
        });

    } catch (error) {
        console.error('Error in /api/clickbot/chat/test:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};    