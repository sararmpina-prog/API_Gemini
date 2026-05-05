import {getHistoryService, streamMessageService, streamSummaryService, classifyBugsService, createPlannerService} from "../services/chatService.js";

//post - userPrompt to get history 
export const getHistory = async (req, res) => {
     
    try {
        console.log("CONTROLLER do getHistory")
        const  text  = req.body.text;

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

        const text = req.query.message || "Qual a temperatura hoje em Lisboa?";
        console.log("TEST UTF8:", "ação, você, informação");

        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
        });
        }

        

         // 1. Headers fundamentais para Streaming (SSE)
            res.setHeader('Content-Type', 'text/event-stream', 'charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('X-Accel-Buffering', 'no'); 
            res.flushHeaders?.();


        await streamMessageService(text, res);
      

    } catch (error) {

        console.error('Error in /api/clickbot/chat/stream:', error);

        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};    


//post - stream summary from AI and store in BD
export const streamSummary = async (req, res) => {
     
    try {
        console.log("CONTROLLER do streamSummary")

        const text = req.body.message || "Durante a última reunião, a equipa analisou o desempenho do produto no último trimestre, identificando um aumento no número de utilizadores ativos, mas também uma taxa de retenção abaixo do esperado. Foram discutidas possíveis causas, incluindo falhas na experiência do utilizador e falta de funcionalidades-chave. Como próximos passos, decidiu-se recolher feedback direto dos utilizadores, priorizar melhorias na interface e lançar uma nova funcionalidade piloto nas próximas semanas para avaliar impacto.";

        // const projectId = 1; 
        const projectId = req.body.projectId

        if (!projectId) {
        return res.status(400).json({ error: "project_id is required" });
        }
        
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
            });
        }


         // 1. Headers fundamentais para Streaming (SSE)
            res.setHeader('Content-Type', 'text/event-stream', 'charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('X-Accel-Buffering', 'no'); 
         

        await streamSummaryService(text, res, projectId);
      

    } catch (error) {

        console.error('Error in api/clickbot/summary/stream:', error);

        res.write(`data: ${JSON.stringify({ error: "Internal error" })}\n\n`);
        res.end();
    }
};    


//post - controller to classify bugs (if critic add to DB)
export const classifyBugs = async (req, res) => {
     
    try {
        console.log("CONTROLLER do classifyBugs")
        const text  = req.body.text;

        console.log("text é", text)

        // Input validation
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
            });
        }


        const bug = await classifyBugsService(text);
        console.log("O bug é", bug)

        res.status(201).json({
            success: true,
            data: bug
        });

    } catch (error) {
        console.error('Error in /api/clickbot/chat/bugs:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};    



//post - controller to classify bugs (if critic add to DB)
export const createPlanner = async (req, res) => {
     
    try {
        console.log("CONTROLLER do createPlanner")
        const text  = req.body.text;

        console.log("text é", text)

        // Input validation
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Text is required and must be a non-empty string'
            });
        }


        const planner = await createPlannerService(text);
        console.log("A planner é", planner)

        res.status(201).json({
            success: true,
            data: planner
        });

    } catch (error) {
        console.error('Error in /api/clickbot/chat/planner:', error);
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