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