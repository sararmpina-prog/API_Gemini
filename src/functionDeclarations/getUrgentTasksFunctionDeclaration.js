import {Type } from '@google/genai';

// Define a function that the model can get urgent tasks
export const getUrgentTasksFunctionDeclaration = {
  name: "get_urgent_tasks",
  description: "Get all urgent tasks. Use this when user asks for urgent tasks.",

  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};