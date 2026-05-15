import 'dotenv/config';
import {callGeminiWithFunctionDefinition} from '../callGemini.js'
import {db} from "../db.js"



console.log('API Key in service:', process.env.GEMINI_API_KEY ? 'LOADED' : 'NOT LOADED');


// Chamada à callGemini (passar userPrompt, chamada para guardar na BD, resposta para controller)
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

//Inserir na BD caso passe validação (haja resposta da apiGemini)
async function saveMessage(prompt, response) {

    console.log("A resposta para guardar o histórico é", response)

    await db.query(
    'INSERT INTO chat_history (user_message, ai_response) VALUES (?, ?)',
    [prompt, response]
  );
  
}




