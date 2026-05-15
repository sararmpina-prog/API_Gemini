const MAX_DESCRIPTION_LENGTH = 250;

//Validate description length
export function validateDescription(description) {

  console.log("estou no middleware de validar descrição")

  if (!description) return null;

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    throw new Error(
      `Descrição demasiado longa. Máximo permitido: ${MAX_DESCRIPTION_LENGTH} caracteres.`
    );
  }

  return description;
}