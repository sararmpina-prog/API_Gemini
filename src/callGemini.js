
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// 1. Definimos o Schema para a Tarefa do ClickUp
// O Zod permite-nos adicionar .describe(), que o Gemini usa para entender o campo!
export const clickupTaskSchema = z.object({
  name: z.string().describe("Um título curto e profissional para a tarefa."),
  description: z.string().describe("Um resumo detalhado do que precisa ser feito."),
  priority: z.enum(["Urgente", "Alta", "Normal", "Baixa"]).describe("Nível de prioridade:  (Urgente),  (Alta),  (Normal),  (Baixa).").default("Normal"),
  tags: z.array(z.string()).describe("Lista de categorias/etiquetas relevantes (ex: bug, feature, design).").nullish().default([]),
  estimated_hours: z.number().nullish().optional().describe("Estimativa de tempo em horas, se mencionada.")
});



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


// Can potentially pass a variable and change systemPrompt - not needed yet
export function createSystemPrompt() {

  return `Tu és um assistente para gestão de tarefas e usuários. 
  Ajuda os utilizadores a gerir tarefas. 
  Responde de forma simples e profissinal. 
  Pede clarificação se necessário. 
  Responde sempre em formato JSON válido sem texto extra.
  Resposta em português de Portugal.`

}


// History general starts off as a empty array
let history = [];



//Experiment changes - not to be called 
export function classifyPriority(){

  console.log("A função da classificação de prior foi chamada")

  return [
  {role: "user", parts: [{text: "O site foi abaixo"}]},
  {role: "model", parts: [{text: "{\"priority\": \"High\", \"tags\" : \"Bug\"}"}]},

  {role: "user", parts: [{text: "Gostava de mudar o botão"}]},
  {role: "model", parts: [{text: "{\"priority\": \"Medium\", \"tags\" : \"UI Enhancement\"}"}]},

  {role: "user", parts: [{text: "Gostava de trocar o favicon"}]},
  {role: "model", parts: [{text: "{\"priority\": \"Low\", \"tags\" : \"UI Enhancement\"}"}]},
 ]

}



//GenerateNames - submit temperature level
export function generateNames(temperatura){

 return temperatura
}


// Gemini API helper function simples
export async function callGeminiSimples(userPrompt, temperatura = 0, includeThoughts) {

try {    

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [{ role: "user", parts: [{text: userPrompt}]}], 
        config: {
          systemInstruction: createSystemPrompt(), 
          responseMimeType: "application/json",
          responseJsonSchema: zodToJsonSchema(clickupTaskSchema),
          temperature: generateNames(temperatura), 
          ...(includeThoughts && {
          thinkingConfig: {
            includeThoughts: true,
            thinkingBudget: 1024,
          }
        })
      }
    });


    return response.candidates[0].content.parts[0].text


} catch (error) {

    console.error('Gemini API Error:', error.response?.data || error);

    throw new Error('Failed to call Gemini API');
  }
}


// Gemini API helper function simples
export async function callGeminiWithHistory(userPrompt, temperatura = 0, includeThoughts) {

try {    

    if (history.length > 20) {
      await summarizeHistory();
    }


    history.push({
      role: "user",
      parts: [{ text: userPrompt }]
    });


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: history, 
        config: {
        systemInstruction: createSystemPrompt(), 
        temperature: generateNames(temperatura),
        ...(includeThoughts && {
        thinkingConfig: {
          includeThoughts: true,
          thinkingBudget: 1024,
          }
        })
      }
    });


    let botReply = response.candidates[0].content.parts[0].text

    history.push({
    role: "model",
    parts: [{ text: botReply }]
  });

    return botReply;


} catch (error) {

    console.error('Gemini API Error:', error.response?.data || error);

    throw new Error('Failed to call Gemini API');
  }
}



// SummaryHistory to be called in callGemini with history
async function summarizeHistory() {

  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        ...history,
        {
          role: "user",
          parts: [{
            text: "Resume esta conversa em poucas linhas, mantendo apenas informação importante sobre o utilizador."
          }]
        }
      ]
    });

    const summary = response.candidates[0].content.parts[0].text;

    history = [
      {
        role: "user",
        parts: [{ text: "Resumo da conversa até agora: " + summary }]
      }
    ];

    return summary;

  } catch (error) {

    console.error("Erro ao resumir:", error);

    throw new Error('Failed to call Gemini API');

  }
}



// Public wrapper used by other modules in the project.
// By default it calls the simple version; pass useHistory=true to use the history-aware one.
export async function callGemini(userPrompt, temperatura = 0.5, includeThoughts = false, useHistory = false) {
  if (useHistory) {
    return callGeminiWithHistory(userPrompt, temperatura, includeThoughts);
  }

  return callGeminiSimples(userPrompt, temperatura, includeThoughts);
}


//callGemini for streams!
/*export async function callGeminiStreams(userPrompt, res) {

try {    

    const result = await ai.models.generateContentStream({
       model: "gemini-3-flash-preview",
    contents: "Explain how AI works", 
    });

    let chunkText = ''; 

    for await (const chunk of result.stream) {
      // Na nova SDK, o acesso ao texto é direto através de propriedades ou do método text()
      chunkText += chunk.text();

    }

    if (chunkText) {
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
      }

      console.log(chunkText)
      return chunkText

    } catch (error) {

    console.error('Gemini API Error:', error.response?.data || error);

    throw new Error('Failed to call Gemini API');
  }

}*/


export async function callGeminiStreams(userPrompt, res) {
  try {
    // Use the global ai instance (same as working code)
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
    });

    for await (const chunk of response) {
      const text = chunk.text;
      if (text && res) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    if (res) {
      res.write('data: [DONE]\n\n');
      res.end();
    }
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    if (res) {
      res.write(`data: ${JSON.stringify({ error: "Erro na comunicação com Gemini" })}\n\n`);
      res.end();
    }
  }
}