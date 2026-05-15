import 'dotenv/config';
import {callGeminiWithFunctionDefinition} from '../callGemini.js'
import {db} from "../db.js"



console.log('API Key in service:', process.env.GEMINI_API_KEY ? 'LOADED' : 'NOT LOADED');


// Requesting history from chatbot
export async function sendPromptService(text) {
    
   console.log("estou no send prompt service")   
    try {
    let prompt = text
    console.log("prompt", prompt)

    const response = await callGeminiWithFunctionDefinition(prompt);

    console.log('Gemini Response:', response.message);


    await saveMessage(text, response.message);

    return response

  } catch (error) {
      console.error('Error in sendPromptService:', error);
    
      throw error;
  }
}


async function saveMessage(prompt, response) {
  if (response) {
    console.log("A resposta para guardar o histórico é", response)
    return db.query(
    'INSERT INTO chat_history (user_message, ai_response) VALUES (?, ?)',
    [prompt, response]
  );
  } 
}




