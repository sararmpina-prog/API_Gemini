import 'dotenv/config';
import {callGeminiSimples, clickupTaskSchema} from '../callGemini.js'


// AI Helper Functions with Gemini Integration
export async function createTask(text) {
    console.log("Serviço criar tarefa")
  
    let prompt = `Analise o seguinte pedido de suporte e extraia as informações necessárias para criar uma tarefa no ClickUp.
    Pedido: "${text}"
    
    Regra:
    - Nunca omita campos 
    - Preenche sempre o campo "name"
    - Não deixes tags vazias se houver contexto implícito
    - Gere tags sempre que possível com base no contexto da tarefa
  
    - Nunca uses null para estimated_hours.
    - Esse campo é obrigatório e deve ser sempre um número. 
        `

    try {

      const response = await callGeminiSimples(prompt);

      console.log("RAW:", response);

      let parsed = JSON.parse(response)

      const normalized = {
        name: parsed.name ?? parsed.task ?? "Tarefa sem título",
        description: parsed.description ?? "",
        priority: normalizePriority(parsed.priority),
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        estimated_hours: parsed.estimated_hours ?? 3
      };


      const taskData = clickupTaskSchema.parse(normalized);

      console.log("Tarefa Estruturada para o ClickUp:");
      console.log(taskData);

      return taskData

  } catch (error) {

    console.error('Error in createTaskFromText:', error);
    
    throw new Error('Failed to create task');
  }
}


//Erros de maisculas/minusculas
export function normalizePriority(priority) {
  if (typeof priority !== "string") return "Normal";

  const p = priority.toLowerCase();

  if (p === "urgente") return "Urgente";
  if (p === "alta") return "Alta";
  if (p === "normal") return "Normal";
  if (p === "baixa") return "Baixa";

  return "Normal";
}

// export function estimateHours(priority, tags) {
//   if (tags.includes("bug")) return 2;
//   if (tags.includes("design")) return 4;
//   if (priority === "Urgente") return 6;

//   return 3; 
// }

export async function refineTaskService(task) {

    let temperatura = 0.5
  
    console.log("SERVICE FILE LOADED");
    console.log("TASK SENT:", JSON.stringify(task));

     let prompt = `Refina a tarefa fornecida mantendo o significado original.

      { "title": string,
      "description": string,
      "priority": "high" | "medium" | "low",
      "tags": string[]
    }
    Regras:
      - "title": máximo 8 palavras
      - "description": entre 20 a 30 palavras
      - focar apenas no problema e ação necessária
      - NÃO criar uma nova tarefa
      - manter contexto original
      - "tags": máximo 3 palavras-chave em inglês

      Devolve apenas JSON válido sem texto extra. 
      
      Tarefa de entrada (JSON):
      ${JSON.stringify(task)}`


      try {
         const response = await callGemini(prompt, temperatura, false);

         const cleanedResponse = response.replace(/```json\n?|```/g, '').trim();

         console.log('Gemini Response:', cleanedResponse);

         return JSON.parse(cleanedResponse);
     } catch (error) {
         console.error('Error in refineTask:', error);

        // Fallback to simple processing
        throw new Error('Failed to generate task breakdown');
     }
}


export async function summarizeTaskService(task) {


    let prompt = `Faz me o sumário para a descrição da tarefa de entrada ser mais resumida, tarefa do tipo jira ou clickup: 
    
     { "title": string,
      "description": string,
      "priority": "high" | "medium" | "low",
      "tags": string[]
    }
    Regras:
     - "description": máximo 1 frase

      Deve ser apenas JSON válido sem texto extra. 
      
    Tarefa de entrada (JSON):
    ${JSON.stringify(task)}`

       try {

         const response = await callGemini(prompt, temperatura, false);

         const cleanedResponse = response.replace(/```json\n?|```/g, '').trim();

         console.log('Gemini Response:', cleanedResponse);

         return JSON.parse(cleanedResponse);

     } catch (error) {
         console.error('Error in summarizeTask:', error);
         // Fallback to simple processing
         throw new Error('Failed to generate task breakdown');
     }
}


//Suggest tags based on task
export async function suggestTagsService(task) {

    let temperatura = 0.5

    let prompt = `Com base nesta tarefa atribui tags que devem pertencer à mesma: 
    
     { "title": string,
      "description": string,
      "priority": "high" | "medium" | "low",
      "tags": string[]
    }
    Regras:
     - "tags": nomes em inglês. Entre 1 a 4 tags.

    Devolve apenas JSON válido sem texto extra. 
      
    tarefa:${JSON.stringify(task)}`

       try {
         const response = await callGemini(prompt, temperatura, false);
         const cleanedResponse = response.replace(/```json\n?|```/g, '').trim();
         console.log('Gemini Response:', cleanedResponse);
         return JSON.parse(cleanedResponse);
     } catch (error) {
         console.error('Error in tags suggesting:', error);
         // Fallback to simple processing

        throw new Error('Failed to generate task breakdown');
     }
}


//Get step by step from LLM
export async function planSprintService(text) {


    let prompt = `Com base neste texto, estrutura esta tarefa em subtarefas .

    
      Formato obrigatório:
      {
        "reasoning": "curto resumo da lógica (1-2 frases)",
        "tasks": [
          {
            "name": "",
            "description": "",
            "hours": 0
          }
        ],
        "total_hours": 0
      }
      Regras:
      Sem markdown.
      Sem explicações.
      A resposta deve começar com { e terminar com }.
      É proibido qualquer carácter fora do JSON.
      Se não souberes traduzir, simplifica em português.
      Adiciona 20% de margem no total final de horas.  
      
      Texto:
      "${text}"`

       try {
         const response = await callGemini(prompt, temperatura);
         const match = response.match(/\{[\s\S]*\}/);

        if (!match) {
            throw new Error("No JSON found in model response");
        }

        return JSON.parse(match[0]);

     } catch (error) {
         console.error('Error in planning step by step:', error);
         // Fallback to simple processing
         throw new Error('Failed to generate sprint plan');
     }
}



//Post breakdownService - break down big task into smaller tasks
export async function generateTaskBreakdownService(text) {

    let temperatura = 0.5

    let prompt = `Descontrói esta tarefa em subtarefas.

      Formato obrigatório:
      {
        "main_task": string,
        "subtasks": [
          {
            "title": "",
          }
        ]
      }
      Regras:
      Sem markdown.
      A resposta deve começar com { e terminar com }.
      É proibido qualquer carácter fora do JSON.
      - Cada subtarefa deve ser específica e acionável
      - Evitar subtarefas demasiado vagas 
      - Evitar dividir em tarefas demasiado pequenas 
      - Agrupar tarefas relacionadas quando fizer sentido
        
    Devolve apenas JSON válido sem texto extra. 


      Texto:
      "${text}"`

       try {
         const response = await callGemini(prompt, temperatura);
         const match = response.match(/\{[\s\S]*\}/);

        if (!match) {
            throw new Error("No JSON found in model response");
        }

        return JSON.parse(match[0]);

     } catch (error) {
         console.error('Error in planning step by step:', error);
         // Fallback to simple processing
         throw new Error('Failed to generate task breakdown');
     }
}

//Tipo date 