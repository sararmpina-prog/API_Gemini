import 'dotenv/config';
import {callGeminiSimples, callGeminiStreams, callGeminiWithHistory} from '../callGemini.js'
import {sentimentSchema } from '../schemas/sentimentSchema.js';
import { plannerSchema } from '../schemas/plannerSchema.js';
import {db} from "../db.js"
import { comments } from '../utils/comments.js';


console.log('API Key in service:', process.env.GEMINI_API_KEY ? 'LOADED' : 'NOT LOADED');


// Requesting history from chatbot
export async function getHistoryService(text) {
    
    let prompt = text
      
    try {

      const response = await callGeminiWithHistory(prompt);

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

    const result = await callGeminiStreams(text, res);

    await saveMessage(text, result);

    return result;


  } catch (error) {
      console.error('Error in streamMessageService:', error);
    
      throw new Error('Failed to obtain stream');
  }
}

async function saveMessage(prompt, response) {
  return db.query(
    'INSERT INTO chat_history (user_message, ai_response) VALUES (?, ?)',
    [prompt, response]
  );
}

//Post - send summary and get response in chunks 
export async function streamSummaryService(text, res, projectId) {
    
    try {

      let prompt = `Devolve apenas um resumo curto em texto simples, sem formatação, sem listas, sem markdown do seguinte texto:
      "${text}"`

      const result = await callGeminiStreams(prompt, res);

      console.log("o texto é", text)

       
      await saveMeetingSummary(projectId, text, result);

    return result;



  } catch (error) {
      console.error('Error in streamSummaryService:', error);
    
      throw new Error('Failed to obtain message summary');
  }
}


async function saveMeetingSummary(projectId, input, summary) {
  return db.query(
    'INSERT INTO meeting_summaries (original_text, summary, project_id, created_at) VALUES (?, ?, ?, CURRENT_DATE)',
    [input, summary, projectId]
  );
}


// Creating classifier bugs 
export async function classifyBugsService(text) {

    console.log("Estou no serviço do classifier de bugs")
    
    let prompt = `Analisa o seguinte erro e responde apenas em json com:
      - error_type: UI | API | Database
      - severity: número de 1 a 10
      - fix_suggestion: sugestão curta

      Erro:
      "${text}"`
      
    try {

      const response = await callGemini(prompt);

      const cleanedResponse = response.replace(/```json\n?|```/g, '').trim();

      console.log('Gemini Response:', cleanedResponse);

     let result = JSON.parse(cleanedResponse);

     console.log("resultado =", result)

     if (result.severity >= 7) {
        inserirTicket(result)
     }
     
     return result

  } catch (error) {
      console.error('Error in classifyBugsService:', error);
    
      throw new Error('Failed to create bug classifier');
  }
}


async function inserirTicket(result) {
  return db.query(
    'INSERT INTO tickets (type, severity, suggestion) VALUES (?, ?, ?)',
    [result.error_type, result.severity, result.fix_suggestion]
  );
}


// Creating weekly planner
export async function createPlannerService(text) {

    console.log("Estou no serviço de criar uma agenda semanal")
    
    let prompt = `Organiza a seguinte semana com base nas tarefas fornecidas. Faz para uma só semana de 7 dias. 

        Regras:
        - week_plan deve ser um array de objetos (NÃO um array de strings)
        - cada dia deve ser um objeto com day, tasks e time
        - NÃO expliques nada
        - NÃO incluas pensamentos
        - NÃO uses markdown
        - responde apenas com JSON válido

        Formato obrigatório:
       {
          "explicacao": "string",
          "week_plan": [
            {
              "day": "segunda",
              "tasks": ["string"],
              "time": "manhã" | "tarde" | "noite"
            }
          ]
        }

        Tarefas:
      "${text}"`
      
    try {

      const response = await callGeminiSimples(prompt, {includeThoughts: true, schema: plannerSchema });

      

      console.log('Gemini Response:', response);

      const cleanedResponse = response.text.replace(/```json\n?|```/g, '').trim();

      console.log("resultado =", cleanedResponse)
      
      return cleanedResponse

  } catch (error) {
      console.error('Error in createPlannerService', error);
    
      throw new Error('Failed to create a weekly planner');
  }
}


// Sentiment dashboard
export async function sentimentDashboardService() {

    console.log("Estou no serviço de sentiment Dashboard")

    const last20 = comments.slice(-20);
    
   const prompt = `
      Analisa os seguintes comentários de equipa e produz uma avaliação consolidada do estado da equipa.

      Comentários:
      ${last20}

      Instruções:
        - Baseia-te apenas nos comentários fornecidos
        - Não inventes informação
        - Se houver sinais de stress, pressão, bloqueios ou sobrecarga, reflete isso na análise
        - "team_mood" deve representar o sentimento geral dominante
        - "main_blocker" deve identificar o principal problema mencionado (ou vazio se não houver)
        - "burnout_risk" deve ser true se houver sinais claros de cansaço extremo, sobrecarga ou frustração contínua

      
      Responde APENAS com JSON válido, sem texto adicional, neste formato exato:

      {
        "team_mood": "happy" | "stressed" | "neutral",
        "main_blocker": "string",
        "burnout_risk": boolean
      }
      `;
   
      
    try {

      const response = await callGeminiSimples(prompt, {schema: sentimentSchema });

      const cleanedResponse = response.replace(/```json\n?|```/g, '').trim();

      console.log('Gemini Response:', cleanedResponse);

     
      console.log(JSON.parse(cleanedResponse))

  } catch (error) {
      console.error('Error in sentimentDashboardService', error);
    
      throw new Error('Failed to create a sentiment dashboard');
  }
}

// sentimentDashboardService(); 