import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import {createSystemPrompt} from './prompts/systemPrompt.js'
import {setTaskCreationFunctionDeclaration } from './functionDeclarations/setTaskCreationFunctionDeclaration.js';
import {setTaskDeleteFunctionDeclaration} from './functionDeclarations/setTaskDeleteFunctionDeclaration.js'
import {setTaskUpdateFunctionDeclaration} from './functionDeclarations/setTaskUpdateFunctionDeclaration.js'
import {setTaskCreation} from './servicesDeclarations/taskCreation.js'
import {setTaskDelete} from './servicesDeclarations/taskDelete.js'
import {setTaskUpdate} from './servicesDeclarations/taskUpdate.js'
import { getUrgentTasks } from './servicesDeclarations/getUrgentTasks.js';
import {getUrgentTasksFunctionDeclaration} from './functionDeclarations/getUrgentTasksFunctionDeclaration.js'

// History general starts off as a empty array
let history = [];

console.log("Chave carregada:", process.env.GEMINI_API_KEY ? "SIM" : "NÃO");
// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

//Ter vários modelos disponiveis 
const GEMINI_MODELS = [
  //  "gemini-3.1-pro",
    "gemini-2.5-pro",
    "gemini-3-flash",
    "gemini-2.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-2-flash",
    "gemini-2-flash-lite",
    "gemini-2.5-flash-lite"
];


// Initialize Gemini AI (same as working code)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY 
});


//Criar config 
const config = {

  systemInstruction: createSystemPrompt(),

  tools: [
      {
          functionDeclarations: [
              setTaskCreationFunctionDeclaration,
              setTaskDeleteFunctionDeclaration,
              setTaskUpdateFunctionDeclaration,
              getUrgentTasksFunctionDeclaration
          ]
      }
  ],

  toolConfig: {
      functionCallingConfig: {
          mode: 'AUTO'
      }
  }
}; 


export async function callGeminiWithFunctionDefinition(userPrompt) {

  history.push({
      role: "user",
      parts: [{ text: userPrompt }]
  });

  console.log("Histórico da conversa (primeiro push)", history)
  console.log("Histórico:", JSON.stringify(history, null, 2))

  try {

  let currentResponse = await generateWithFallback(history, config);

  console.log(JSON.stringify(currentResponse, null, 2));

  let step = 1;
  const MAX_STEPS = 5;

  let urgentTasksResult; 
  let tasks; 
  while ( step <= MAX_STEPS) {

  const parts = currentResponse?.candidates?.[0]?.content?.parts || [];

  console.log("parts =", parts)

  if (parts && parts.length > 0) {
  console.log("parts existe e length maior que zero")  
  history.push({
    role: "model",
    parts
  });
}

  console.log("Histórico da conversa (resposta Gemini)", history)
  console.log("Histórico:", JSON.stringify(history, null, 2))

  console.log("parts", parts)
  console.log(`🔁 STEP ${step}`);
  console.log("Funções pedidas pelo modelo:");

  const functionCalls = parts.filter(p => p.functionCall).map(p => p.functionCall)


  console.log("functionCalls", functionCalls)

 if (functionCalls.length == 0) {

    break
    }

    // Mostrar chamadas
   currentResponse.functionCalls.forEach(fn => {
    console.log(`➡️ ${fn.name}`, fn.args);
  });
  

/*
 * ================================
 * 5. EXECUTAR FUNÇÕES (SIMULAÇÃO)
 * ================================
 */
    const functionResults = await Promise.all(currentResponse.candidates[0].content.parts
    .filter(p => p.functionCall)
    .map(async (p) => {

    const fn = p.functionCall;  
    let result;

    switch (fn.name) {
      case 'set_task_creation':
        result = await setTaskCreation(fn.args);
        break;

      case 'set_task_delete':
        result = await setTaskDelete(fn.args.id);
        break;

      case 'set_task_update':
      result = await setTaskUpdate(fn.args);
      break;

      case "get_urgent_tasks":
      result = await getUrgentTasks();
      break;

      default:
      result = { error: 'Unknown function' };
    }

    console.log(`✅ Executada: ${fn.name}`, result);

    return {
      name: fn.name,
      response: result ?? {},
      thought_signature: fn.thought_signature
    };
  }));

      // Adicionar function responses ao histórico
      const toolMessage = {
        role: "tool",
        parts: functionResults.map(fr => ({
          functionResponse: {
            name: fr.name,
            response:  fr.response  ?? {}
          }
        }))};

      history.push(toolMessage);

      console.log("Histórico da conversa (resposta Gemini execução funções)", history)
      console.log("Histórico:", JSON.stringify(history, null, 2))
      

  // Pedir próxima resposta ao Gemini
  currentResponse = await generateWithFallback(history, config);
    step++;
    console.log("currentResponse", currentResponse) 

    urgentTasksResult = functionResults.find(
    fr => fr.name === "get_urgent_tasks"
  );

  tasks = urgentTasksResult?.response?.tasks || null;
  }

          
// Resposta final texto
  // const finalText = currentResponse?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;

  
  
  const finalParts =
  currentResponse?.candidates?.[0]?.content?.parts || [];

  console.log("final parts", finalParts)

  const finalText =
  finalParts.find(p => p.text)?.text;

  console.log("finalText", finalText)

  if (finalText) {

    history.push({
        role: "model",
        parts: [{ text: finalText }]
    });
  }

  console.log("Histórico da conversa (resposta FINALISSIMO)", history)
  console.log("Histórico:", JSON.stringify(history, null, 2))

  // if (urgentTasksResult) {

  //     return {
  //       success: true,
  //       type: "tasks",
  //       tasks: urgentTasksResult.response.tasks
  //     };
  //   }

  console.log("isto são as tarefas", urgentTasksResult?.response?.tasks)
  console.log("isto são os textos", finalText?.trim())

  const finalResponse = {
      success: true,
      message: finalText,
      tasks: tasks
    
    };
    console.log("finalResponse", finalResponse)
return finalResponse
 
      
} catch (error) {

  console.error(
      "Gemini API Error:",
      error.response?.data || error
  );

  throw error
    }
  }




async function generateWithFallback(contents, config) {

  let lastError = null;

  for (let i = 0; i < GEMINI_MODELS.length; i++) {
    let model = GEMINI_MODELS[i];

    try {
    console.log("A tentar modelo:", model);

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: config
    });

    console.log("Sucesso com modelo:", model);

    return response; 

 } catch (error) {

  console.warn("Modelo falhou porque", error.message);

  if (error.status === 404) {
  console.log("Modelo não existe, a continuar...");
  continue;
}

  lastError = error;
}}
  throw lastError;
  }






// export async function callGeminiWithFunctionDefinition(userPrompt) {

//     //Generation config with function declaration
//     const config = {
//         systemInstruction: createSystemPrompt(), 
//         tools: [ {
//             functionDeclarations: [setTaskCreationFunctionDeclaration]
//         }]
//     }

//     //Summarize - not good with functionTools
//     //  if (history.length > 20) {
//     //   await summarizeHistory();
//     // }

//     // if (history.length > 30) {

//     //   history = history.slice(-10);

//     // }

//     //Configure user prompt
//     history.push(
//       {
//         role: "user",
//         parts: [{ text: userPrompt }]
//       }
//     )

//   console.log("Histórico da conversa é deppois do primeiro push", history)
//   console.log("Histórico:", JSON.stringify(history, null, 2))

//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash-lite",
//       contents: history,
//       config: config
//     });

    

//     const candidate = response?.candidates?.[0];
//     console.log("candidate", candidate)

//     const functionCall = candidate?.content?.parts?.find(
//       p => p.functionCall
//     )?.functionCall;

//     console.log("functionCall:", functionCall);

//     // ❌ Não houve function call
//     if (!functionCall) {
//       const text = candidate?.content?.parts?.[0]?.text;
//       history.push( {
//         role: "model",
//         parts: [{ text }]
//       })
//       console.log("Histórico da conversa no fim é", history)
//       console.log("Histórico no !functionCall:", JSON.stringify(history, null, 2))
//       return {
//         success: false,
//         type: "text",
//         content: candidate?.content?.parts?.[0]?.text || "Sem resposta"
//       };
//     }

//     // adicionar function call ao histórico
//     history.push({
//       role: "model",
//       parts: [{
//         functionCall
//       }]
//     });


//     let result;
//     const tool_call = response.functionCalls?.[0]
//     if (functionCall) {
//       if (functionCall.name === "set_task_creation") {
//         console.log("functionCall[0]", tool_call)
//         result = await setTaskCreation(
//           functionCall.args.name,
//           functionCall.args.description,
//           functionCall.args.priority,
//           functionCall.args.tags,
//           functionCall.args.estimated_hours, 
//           functionCall.args.assignee ?? null,
//           functionCall.args.dueDate ?? null,
//           functionCall.args.space ?? null
//         )

//           console.log(`Execução da função é ${JSON.stringify(result)}`)   
//       }
//     }
    
//     const function_response_part = {
//       name: tool_call.name,
//       response: {result},
//       id: tool_call.id
//     }

    
//     history.push({role: 'tool', parts: [{functionResponse: function_response_part}]})

//     const final_response = await ai.models.generateContent({
//         model: "gemini-2.5-flash-lite",
//         contents: history,
//         config: config
//     });

//     console.log("final_response.text =", final_response?.candidates?.[0]?.content?.parts?.[0]?.text)

//     console.log("Histórico da conversa no fim é", history)
//     console.log("Histórico:", JSON.stringify(history, null, 2))  

//     return {
//         success: true,
//         type: "text",
//         content:
//           final_response?.candidates?.[0]?.content?.parts?.[0]?.text
//       };

    
//   } catch (error) {
//     console.error('Gemini API Error:', error.response?.data || error);
//     throw new Error('Failed to call Gemini API');
//   }
// }


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
            text: `
              Resume a conversa mantendo:

              - intenção atual do utilizador
              - tarefas em criação
              - perguntas pendentes
              - contexto necessário para continuar workflows
              - dados importantes já fornecidos

              Não cries texto genérico.
              Mantém contexto operacional.
              `
          }]
        }
      ]
    });

    const summary = response.candidates[0].content.parts[0].text;

    history = [
      {
        role: "model",
        parts: [{ text: "Resumo da conversa até agora: " + summary }]
      }
    ];

    return summary;

  } catch (error) {

    console.error("Erro ao resumir:", error);

    throw new Error('Failed to call Gemini API');

  }
}
