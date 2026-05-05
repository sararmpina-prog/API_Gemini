import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import {createSystemPrompt} from './prompts/systemPrompt.js'
import { generateNames } from './utils/generateTemperature.js';
import { zodToJsonSchema } from "zod-to-json-schema";

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


// Gemini API helper function simples
export async function callGeminiSimples(userPrompt, { temperatura = 0.2, includeThoughts = false, schema = clickupTaskSchema } = {}) {

  
try {    

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [{ role: "user", parts: [{text: userPrompt}]}], 
        config: {
          systemInstruction: createSystemPrompt(), 
          responseMimeType: "application/json",
          responseJsonSchema: zodToJsonSchema(schema),
          temperature: generateNames(temperatura), 
          ...(includeThoughts && {
          thinkingConfig: {
            includeThoughts: true,
            thinkingBudget: 520,
          }
        })
      }
    });


    const parts = response.candidates?.[0]?.content?.parts || [];

    console.log(JSON.stringify(response, null, 2));

    let thoughts = null;
    let text = null;

     // Se houver mais de uma parte, a primeira é o pensamento e a última é a resposta final
    if (parts.length > 1) {
        thoughts = parts[0]?.text; // Captura o processo de pensamento
        text = parts[parts.length - 1]?.text; // Captura o JSON/texto final
    } else {
        text = parts[0]?.text; // Captura apenas o texto se includeThoughts for false
    }

    const parsed = JSON.parse(text);

    console.log("thoughts",thoughts)
    console.log("text",text)
      // Retorna ambos em um formato estruturado
    return { 
        thoughts, 
        text 
    };

} catch (error) {

    console.error('Gemini API Error:', error.response?.data || error);

    throw new Error('Failed to call Gemini API');
  }
}


// Gemini API helper function simples
export async function callGeminiWithHistory(userPrompt, temperatura = 1, includeThoughts) {

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
export async function callGemini(userPrompt, temperatura = 0.2, includeThoughts = false, useHistory = false) {
  if (useHistory) {
    return callGeminiWithHistory(userPrompt, temperatura, includeThoughts);
  }

  return callGeminiSimples(userPrompt, temperatura, includeThoughts);
}


export async function callGeminiStreams(userPrompt, res) {
  try {
    // Use the global ai instance (same as working code)
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        temperature: 1
      }
    });

    let fullResponse = ""
   
    for await (const chunk of response) {
      console.log("RAW CHUNK:", chunk);
      console.log("tipo de chunk",typeof chunk)
      const text = chunk.text;
      console.log("TEXT:", text);
      if (text && res) {
        fullResponse += text
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    


    if (res) {
      res.write('data: [DONE]\n\n');
      res.end();
    }

    return fullResponse

  } catch (error) {
    console.error('Gemini API Error:', error.message);
    if (res) {
      res.write(`data: ${JSON.stringify({ error: "Erro na comunicação com Gemini" })}\n\n`);
      res.end();
    }
  }
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
