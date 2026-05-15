import 'dotenv/config';
import {callGeminiWithFunctionDefinition} from '../callGemini.js'
import {db} from "../db.js"



console.log('API Key in service:', process.env.GEMINI_API_KEY ? 'LOADED' : 'NOT LOADED');


// Call to API gemini, if returns answer calls "save message" for DB otherwise returns "no message"
export async function sendPromptService(text) {
    
   console.log("estou no send prompt service")   
 
    let prompt = text
    console.log("prompt", prompt)

    const response = await callGeminiWithFunctionDefinition(prompt);

    if (!response || !response.message) {
      console.log("Resposta inválida do Gemini");
      return {
        success: false,
        message: "Sem resposta do modelo"
    };
  }

    console.log('Gemini Response:', response.message);

    await saveMessage(text, response.message);

    return response

 
}

//saves message (user prompt and answer) if there's an answer 
async function saveMessage(prompt, response) {

    console.log("A resposta para guardar o histórico é", response)

    await db.query(
    'INSERT INTO chat_history (user_message, ai_response) VALUES (?, ?)',
    [prompt, response]
  );
  
}




