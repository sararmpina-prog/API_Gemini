//Validate priorities are this ones
const priorities = ["Urgente", "Alta", "Normal", "Baixa"];

export function validatePriority(priority) {
  console.log("estou no middleware de validar prioridade")
  const clean = String(priority ?? "").trim();

  if (!priorities.includes(clean)) {
    throw new Error ("Priority can only be Urgente, Alta, Normal, Baixa")
  }

  return clean;
}

