import {Type } from '@google/genai';

export const getUrgentTasksFunctionDeclaration = {
  name: "get_urgent_tasks",
  description: "Get all urgent tasks. Use this when user asks for urgent tasks.",

  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};