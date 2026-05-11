import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import {createSystemPrompt} from './prompts/systemPrompt.js'
import { setTaskCreationFunctionDeclaration } from './functionDeclarations/setTaskCreationFunctionDeclaration.js';
import {setTaskCreation} from './servicesDeclarations/servicesDeclarationsTasks.js'

// History general starts off as a empty array
let history = [];

console.log("Chave carregada:", process.env.GEMINI_API_KEY ? "SIM" : "NÃO");
// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}


// Initialize Gemini AI (same as working code)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY 
});


console.log("Histórico da conversa é", history)

export async function callGeminiWithFunctionDefinition(userPrompt) {

    //Generation config with function declaration
    const config = {
        systemInstruction: createSystemPrompt(), 
        tools: [ {
            functionDeclarations: [setTaskCreationFunctionDeclaration]
        }]
    }

    //Configure user prompt
    history.push(
      {
        role: "user",
        parts: [{ text: userPrompt }]
      }
    )

  console.log("Histórico da conversa é deppois do primeiro push", history)
  console.log("Histórico:", JSON.stringify(history, null, 2))

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: history,
      config: config
    });

    

    const candidate = response?.candidates?.[0];
    console.log("candidate", candidate)

    const functionCall = candidate?.content?.parts?.find(
      p => p.functionCall
    )?.functionCall;

    console.log("functionCall:", functionCall);

    // ❌ Não houve function call
    if (!functionCall) {
      const text = candidate?.content?.parts?.[0]?.text;
      history.push( {
        role: "model",
        parts: [{ text }]
      })
      console.log("Histórico da conversa no fim é", history)
      console.log("Histórico no !functionCall:", JSON.stringify(history, null, 2))
      return {
        success: false,
        type: "text",
        content: candidate?.content?.parts?.[0]?.text || "Sem resposta"
      };
    }

    let result;
    const tool_call = response.functionCalls?.[0]
    if (functionCall) {
      if (tool_call.name === "set_task_creation") {
      console.log("functionCall[0]", tool_call)
      result = await setTaskCreation(
        functionCall.args.name,
        functionCall.args.description,
        functionCall.args.priority,
        functionCall.args.tags,
        functionCall.args.estimated_hours )

        console.log(`Execução da função é ${JSON.stringify(result)}`)   
      }
    }
    
    const function_response_part = {
      name: tool_call.name,
      response: {result},
      id: tool_call.id
    }

    
    history.push({role: 'model', parts: [{functionResponse: function_response_part}]})

    const final_response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: history,
        config: config
    });

    console.log("final_response.text =", final_response?.candidates?.[0]?.content?.parts?.[0]?.text)

    console.log("Histórico da conversa no fim é", history)
    console.log("Histórico:", JSON.stringify(history, null, 2))  

    return {
        success: true,
        type: "text",
        content:
          final_response?.candidates?.[0]?.content?.parts?.[0]?.text
      };

    
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error);
    throw new Error('Failed to call Gemini API');
  }
}

