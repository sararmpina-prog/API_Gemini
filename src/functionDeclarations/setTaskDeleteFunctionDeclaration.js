import {Type } from '@google/genai';

// Define a function that the model can create task 
export const setTaskDeleteFunctionDeclaration = {
name: 'set_task_delete',
description: 'Deletes an existing task',
parameters: {
    type: Type.OBJECT,
    properties: {
       id: {
        type: Type.NUMBER,
        description: `Id of the task to delete. Use the exact task id mentioned by the user.`
        }
    },
        required: ['id'],
    }
}; 