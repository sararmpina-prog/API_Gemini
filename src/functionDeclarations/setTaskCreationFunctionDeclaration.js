import {Type } from '@google/genai';

// Define a function that the model can create task 
export const setTaskCreationFunctionDeclaration = {
name: 'set_task_creation',
description: 'Sets to create a task',
parameters: {
    type: Type.OBJECT,
    properties: {
        name: {
          type: Type.STRING,
          description: 'A short and professional title'
        },
        description: {
          type: Type.STRING,
          description: 'A detailed brief of what needs doing.'
            },
        priority: {
          type: Type.STRING,
          enum: ["Urgente", "Alta", "Normal", "Baixa"],
          description: 'Priority level: Urgent, High, Normal, Low'
        },
        space: {
          type: Type.STRING,
          description: 'Organizational space or category where the task should be created. (example: work, studies, personal)'
        },    
        tags: {
          type: Type.ARRAY,
          description: 'List of categories (example: bug, feature, design).',
          items: {
            type: Type.STRING
          }
        },
        estimated_hours: {
          type: Type.NUMBER,
          description: 'Expected time in hours'
        },
        assignee: {
          type: Type.STRING,
          description: `Person responsible for the task.
              Use the person's name if explicitly mentioned by the user.
              Otherwise, leave it empty. `
        },
        dueDate: {
          type: Type.STRING,
          description: ` Task due date. Use the format: YYYY-MM-DD. Only add if explicitly told a due date`
        },
          },
          required: ['name'],
    }
}; 