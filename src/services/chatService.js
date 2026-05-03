import 'dotenv/config';
import {callGemini, callGeminiStreams} from '../callGemini.js'

console.log('API Key in service:', process.env.GEMINI_API_KEY ? 'LOADED' : 'NOT LOADED');


// Requesting history from chatbot
export async function getHistoryService(text) {
    
    let prompt = text
      
  

    try {

      const response = await callGemini(prompt, temperatura);

      const cleanedResponse = response.replace(/```json\n?|```/g, '').trim();

      console.log('Gemini Response:', cleanedResponse);

      return JSON.parse(cleanedResponse);

  } catch (error) {
      console.error('Error in getHistoryService:', error);
    
      throw new Error('Failed to obtain chatbot history');
  }
}


//GET - Get stream message from AI
export async function streamMessageService(text, res) {
    
    try {

      return await callGeminiStreams(text, res);


  } catch (error) {
      console.error('Error in getHistoryService:', error);
    
      throw new Error('Failed to obtain chatbot history');
  }
}

