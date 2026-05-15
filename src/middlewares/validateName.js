//Extra validations to SystemPrompt 

//Validate task name eixts, length, no code and no numbers
export function validateName(name) {

  console.log("estou no middleware de validar nome")
  const clean = name.trim();

  if (!clean) {
    throw new Error ("Task can not be empty")
  }

  //No numbers
  if (/^\d+$/.test(clean)) {
    throw new Error ("Task name cannot be just numbers")
  }

  //Block code
  const codePatterns = [
    /```/,
    /def\s+\w+\s*\(/,
    /function\s+\w+\s*\(/,
    /class\s+\w+/,
    /import\s+\w+/,
    /<script>/i,
    /<\/script>/i
  ];

  if (codePatterns.some(p => p.test(clean))) {
    throw new Error("Task name cannot contain code");
  }

  if (clean.length > 100) {
    throw new Error ("Task name too long. Maximum 100 caracteres")
  }

  return clean;
}


