import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";


// Definimos o Schema para a Weekly Planner
export const plannerSchema = z.object({
  explicacao: z.string(),
  week_plan: z.array(
    z.object({
      day: z.enum([
        "segunda",
        "terça",
        "quarta",
        "quinta",
        "sexta",
        "sábado",
        "domingo"
      ]),
      tasks: z.array(
        z.object({
          task: z.string(),
          time: z.enum(["manhã", "tarde", "noite"])
        })
      )
    })
  )
});