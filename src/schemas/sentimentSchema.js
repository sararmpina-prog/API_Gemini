import { z } from "zod";



//Schema para sentiment dashboard
export const sentimentSchema = z.object({
  team_mood: z.enum(["happy", "stressed", "neutral"]),
  main_blocker: z.string(),
  burnout_risk: z.boolean()
});