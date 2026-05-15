import {Type } from '@google/genai';

// Define a function that the model can update task 
export const setTaskUpdateFunctionDeclaration = {
  name: 'set_task_update',
  description: `Updates an existing task.

    IMPORTANT:
    - Never guess or infer task IDs.
    - Only use this function when task IDs are explicitly provided:
      - by the user
      - by a previous tool response
      - or by an immediately preceding task creation action.
    - Never infer which tasks should be updated based on vague filters, relative dates, or semantic interpretation alone.
    - Expressions like:
      - "essas tarefas"
      - "as de ontem"
      - "as urgentes"
      - "as antigas"
      are NOT sufficient for automatic updates unless the user explicitly confirms the selected task IDs.
`,

  parameters: {
    type: Type.OBJECT,

    properties: {

      id: {
        type: Type.NUMBER,
        description: `
            ID of the task to update.
            `
      },

      name: {
        type: Type.STRING,
        description: 'Updated task title.'
      },

      description: {
        type: Type.STRING,
        description: 'Updated task description.'
      },

      priority: {
        type: Type.STRING,
        enum: ["Urgente", "Alta", "Normal", "Baixa"],
        description: 'Updated priority level.'
      },

      space: {
        type: Type.STRING,
        description: `
        Updated organizational space.

        Examples:
        - Trabalho
        - Desenvolvimento
        - Estudos
        `
      },

      tags: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING
        },
        description: 'Updated task tags.'
      },

      estimated_hours: {
        type: Type.NUMBER,
        description: 'Updated estimated hours.'
      },

      assignee: {
        type: Type.STRING,
        description: 'Updated assignee.'
      },

      dueDate: {
        type: Type.STRING,
        description: `
        Updated due date.

        Use ISO format:
        YYYY-MM-DD
        `
      }

    },

    required: ['id']
  }
};