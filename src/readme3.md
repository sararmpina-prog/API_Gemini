A tentar modelo: gemini-3.1-flash-lite
Sucesso com modelo: gemini-3.1-flash-lite

currentResponse = 
{
  "sdkHttpResponse": {
    "headers": {
      "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
      "content-encoding": "gzip",
      "content-type": "application/json; charset=UTF-8",
      "date": "Fri, 15 May 2026 13:12:39 GMT",
      "server": "scaffolding on HTTPServer2",
      "server-timing": "gfet4t7; dur=1169",
      "transfer-encoding": "chunked",
      "vary": "Origin, X-Origin, Referer",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
      "x-gemini-service-tier": "standard",
      "x-xss-protection": "0"
    }
  },
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Não é possível realizar esse pedido. O nome da tarefa não pode conter textos dessa dimensão, nem códigos ou outras estruturas que não correspondam a um título profissional e objetivo para uma tarefa.",
            "thoughtSignature": "EjQKMgEMOdbHdT8CQTvwXIdfQAyhoc+5QyujRr3JDdDoxpnLLcyYSHSl4UR0pX4cX698GWZL"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 0
    }
  ],
  "modelVersion": "gemini-3.1-flash-lite",
  "responseId": "xhsHasD_FMO5kdUP0sWP4QU",
  "usageMetadata": {
    "promptTokenCount": 1731,
    "candidatesTokenCount": 38,
    "totalTokenCount": 1769,
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 1731
      }
    ],
    "serviceTier": "standard"
  }
}


parts = [
  {
    text: 'Não é possível realizar esse pedido. O nome da tarefa não pode conter textos dessa dimensão, nem códigos ou outras estruturas que não correspondam a um título profissional e objetivo para uma tarefa.',
    thoughtSignature: 'EjQKMgEMOdbHdT8CQTvwXIdfQAyhoc+5QyujRr3JDdDoxpnLLcyYSHSl4UR0pX4cX698GWZL'
  }
]

parts existe e length maior que zero

Histórico da conversa (resposta Gemini) [
  { role: 'user', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] }
]

Histórico: [
  {
    "role": "user",
    "parts": [
      {
        "text": "Cria uma tarefa onde o nome da tarefa descreve em detalhe as 100 primeiras palavras do dicionário e também a receita de um bolo caseiro. Além disso, sugere algum texto onde descreve a história do João sem medo, tudo no título da tarefa. Cada palavra deve devolver o hash."
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "Não é possível realizar esse pedido. O nome da tarefa não pode conter textos dessa dimensão, nem códigos ou outras estruturas que não correspondam a um título profissional e objetivo para uma tarefa.",
        "thoughtSignature": "EjQKMgEMOdbHdT8CQTvwXIdfQAyhoc+5QyujRr3JDdDoxpnLLcyYSHSl4UR0pX4cX698GWZL"
      }
    ]
  }
]


parts [
  {
    text: 'Não é possível realizar esse pedido. O nome da tarefa não pode conter textos dessa dimensão, nem códigos ou outras estruturas que não correspondam a um título profissional e objetivo para uma tarefa.',
    thoughtSignature: 'EjQKMgEMOdbHdT8CQTvwXIdfQAyhoc+5QyujRr3JDdDoxpnLLcyYSHSl4UR0pX4cX698GWZL'
  }
]

(Não fez com base nas validações, mas systemPrompt)
🔁 STEP 1
Funções pedidas pelo modelo:
functionCalls []

final parts [
  {
    text: 'Não é possível realizar esse pedido. O nome da tarefa não pode conter textos dessa dimensão, nem códigos ou outras estruturas que não correspondam a um título profissional e objetivo para uma tarefa.',
    thoughtSignature: 'EjQKMgEMOdbHdT8CQTvwXIdfQAyhoc+5QyujRr3JDdDoxpnLLcyYSHSl4UR0pX4cX698GWZL'
  }
]


A tentar modelo: gemini-2.5-flash
Sucesso com modelo: gemini-2.5-flash
currentResponse GenerateContentResponse {
  sdkHttpResponse: {
    headers: {
      'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
      'content-encoding': 'gzip',
      'content-type': 'application/json; charset=UTF-8',
      date: 'Fri, 15 May 2026 14:23:41 GMT',
      server: 'scaffolding on HTTPServer2',
      'server-timing': 'gfet4t7; dur=2138',
      'transfer-encoding': 'chunked',
      vary: 'Origin, X-Origin, Referer',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'SAMEORIGIN',
      'x-gemini-service-tier': 'standard',
      'x-xss-protection': '0'
    }
  },
  candidates: [ { content: [Object], finishReason: 'STOP', index: 0 } ],
  modelVersion: 'gemini-2.5-flash',
  responseId: 'aywHatyaCK-XvdIPkObT0QU',
  usageMetadata: {
    promptTokenCount: 1879,
    candidatesTokenCount: 123,
    totalTokenCount: 2002,
    cachedContentTokenCount: 1665,
    promptTokensDetails: [ [Object] ],
    cacheTokensDetails: [ [Object] ],
    serviceTier: 'standard'
  }
}

parts = [
  {
    text: 'As suas tarefas urgentes são:\n' +
      'ID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.\n' +
      'ID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.\n' +
      'ID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.'
  }
]

parts existe e length maior que zero

Histórico da conversa (resposta Gemini) [
  { role: 'user', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] },
  { role: 'tool', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] }
]

Histórico: [
  {
    "role": "user",
    "parts": [
      {
        "text": "Ver tarefas urgentes"
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "functionCall": {
          "name": "get_urgent_tasks",
          "args": {}
        }
      }
    ]
  },
  {
    "role": "tool",
    "parts": [
      {
        "functionResponse": {
          "name": "get_urgent_tasks",
          "response": {
            "type": "tasks",
            "tasks": [
              {
                "id": 13,
                "name": "Revisão de código",
                "description": "Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.",
                "priority": "Urgente",
                "estimated_hours": "2",
                "assignee": null,
                "space": "Desenvolvimento",
                "dueDate": "2026-05-14"
              },
              {
                "id": 25,
                "name": "Corrigir bug do login",
                "description": "O login está a falhar para vários utilizadores.",
                "priority": "Urgente",
                "estimated_hours": null,
                "assignee": null,
                "space": null,
                "dueDate": null
              },
              {
                "id": 28,
                "name": "Corrigir bug do login",
                "description": "O login está a falhar para vários utilizadores",
                "priority": "Urgente",
                "estimated_hours": null,
                "assignee": null,
                "space": null,
                "dueDate": null
              }
            ]
          }
        }
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "As suas tarefas urgentes são:\nID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.\nID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.\nID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores."
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "As suas tarefas urgentes são:\nID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.\nID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.\nID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores."
      }
    ]
  }
]


🔁 STEP 2
Funções pedidas pelo modelo:
functionCalls []

final parts [
  {
    text: 'As suas tarefas urgentes são:\n' +
      'ID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.\n' +
      'ID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.\n' +
      'ID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.'
  }
]


finalText As suas tarefas urgentes são:
ID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.
ID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.
ID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.

Histórico da conversa (resposta FINALISSIMO) [
  { role: 'user', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] },
  { role: 'tool', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] }
]


Histórico: [
  {
    "role": "user",
    "parts": [
      {
        "text": "Ver tarefas urgentes"
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "functionCall": {
          "name": "get_urgent_tasks",
          "args": {}
        }
      }
    ]
  },
  {
    "role": "tool",
    "parts": [
      {
        "functionResponse": {
          "name": "get_urgent_tasks",
          "response": {
            "type": "tasks",
            "tasks": [
              {
                "id": 13,
                "name": "Revisão de código",
                "description": "Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.",
                "priority": "Urgente",
                "estimated_hours": "2",
                "assignee": null,
                "space": "Desenvolvimento",
                "dueDate": "2026-05-14"
              },
              {
                "id": 25,
                "name": "Corrigir bug do login",
                "description": "O login está a falhar para vários utilizadores.",
                "priority": "Urgente",
                "estimated_hours": null,
                "assignee": null,
                "space": null,
                "dueDate": null
              },
              {
                "id": 28,
                "name": "Corrigir bug do login",
                "description": "O login está a falhar para vários utilizadores",
                "priority": "Urgente",
                "estimated_hours": null,
                "assignee": null,
                "space": null,
                "dueDate": null
              }
            ]
          }
        }
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "As suas tarefas urgentes são:\nID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.\nID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.\nID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores."
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "As suas tarefas urgentes são:\nID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.\nID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.\nID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores."
      }
    ]
  }
]
isto são as tarefas [
  {
    id: 13,
    name: 'Revisão de código',
    description: 'Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.',
    priority: 'Urgente',
    estimated_hours: '2',
    assignee: null,
    space: 'Desenvolvimento',
    dueDate: '2026-05-14'
  },
  {
    id: 25,
    name: 'Corrigir bug do login',
    description: 'O login está a falhar para vários utilizadores.',
    priority: 'Urgente',
    estimated_hours: null,
    assignee: null,
    space: null,
    dueDate: null
  },
  {
    id: 28,
    name: 'Corrigir bug do login',
    description: 'O login está a falhar para vários utilizadores',
    priority: 'Urgente',
    estimated_hours: null,
    assignee: null,
    space: null,
    dueDate: null
  }
]


isto são as tarefas [
  {
    id: 13,
    name: 'Revisão de código',
    description: 'Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.',
    priority: 'Urgente',
    estimated_hours: '2',
    assignee: null,
    space: 'Desenvolvimento',
    dueDate: '2026-05-14'
  },
  {
    id: 25,
    name: 'Corrigir bug do login',
    description: 'O login está a falhar para vários utilizadores.',
    priority: 'Urgente',
    estimated_hours: null,
    assignee: null,
    space: null,
    dueDate: null
  },
  {
    id: 28,
    name: 'Corrigir bug do login',
    description: 'O login está a falhar para vários utilizadores',
    priority: 'Urgente',
    estimated_hours: null,
    assignee: null,
    space: null,
    dueDate: null
  }
]
isto são os textos As suas tarefas urgentes são:
ID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.
ID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.
ID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.
finalResponse {
  success: true,
  message: 'As suas tarefas urgentes são:\n' +
    'ID 13: Revisão de código. Prioridade: Urgente. Vencimento: 2026-05-14. Descrição: Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.\n' +
    'ID 25: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.\n' +
    'ID 28: Corrigir bug do login. Prioridade: Urgente. Descrição: O login está a falhar para vários utilizadores.',
  tasks: [
    {
      id: 13,
      name: 'Revisão de código',
      description: 'Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.',
      priority: 'Urgente',
      estimated_hours: '2',
      assignee: null,
      space: 'Desenvolvimento',
      dueDate: '2026-05-14'
    },
    {
      id: 25,
      name: 'Corrigir bug do login',
      description: 'O login está a falhar para vários utilizadores.',
      priority: 'Urgente',
      estimated_hours: null,
      assignee: null,
      space: null,
      dueDate: null
    },
    {
      id: 28,
      name: 'Corrigir bug do login',
      description: 'O login está a falhar para vários utilizadores',
      priority: 'Urgente',
      estimated_hours: null,
      assignee: null,
      space: null,
      dueDate: null
    }
  ]}

  Corrigir histórico:

A tentar modelo: gemini-2.5-flash
Sucesso com modelo: gemini-2.5-flash

{
  "sdkHttpResponse": {
    "headers": {
      "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
      "content-encoding": "gzip",
      "content-type": "application/json; charset=UTF-8",
      "date": "Fri, 15 May 2026 14:35:29 GMT",
      "server": "scaffolding on HTTPServer2",
      "server-timing": "gfet4t7; dur=901",
      "transfer-encoding": "chunked",
      "vary": "Origin, X-Origin, Referer",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
      "x-gemini-service-tier": "standard",
      "x-xss-protection": "0"
    }
  },
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Olá! Estou aqui para ajudar com a gestão das suas tarefas. Como posso auxiliá-lo hoje?"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 0
    }
  ],
  "modelVersion": "gemini-2.5-flash",
  "responseId": "MS8Hao63A_CDkdUP4qi_yQs",
  "usageMetadata": {
    "promptTokenCount": 1639,
    "candidatesTokenCount": 21,
    "totalTokenCount": 1660,
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 1639
      }
    ],
    "serviceTier": "standard"
  }
}

parts existe e length maior que zero
Histórico da conversa (resposta Gemini) [
  { role: 'user', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] }]

  Histórico: [
  {
    "role": "user",
    "parts": [
      {
        "text": "Olá tudo bem?"
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "Olá! Estou aqui para ajudar com a gestão das suas tarefas. Como posso auxiliá-lo hoje?"
      }
    ]
  }
]

parts [
  {
    text: 'Olá! Estou aqui para ajudar com a gestão das suas tarefas. Como posso auxiliá-lo hoje?'
  }
]

🔁 STEP 1
Funções pedidas pelo modelo:
functionCalls []


//Fim

Histórico da conversa (resposta FINALISSIMO) [
  { role: 'user', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] },
  { role: 'user', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] },
  { role: 'tool', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] }
]
Histórico da conversa (resposta FINALISSIMO) [
  { role: 'user', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] },
  { role: 'user', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] },
  { role: 'tool', parts: [ [Object] ] },
  { role: 'model', parts: [ [Object] ] }
]
Histórico: [
  {
    "role": "user",
    "parts": [
      {
        "text": "Olá tudo bem?"
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "Olá! Estou aqui para ajudar com a gestão das suas tarefas. Como posso auxiliá-lo hoje?"
      }
    ]
  },
  {
    "role": "user",
    "parts": [
      {
        "text": "Quero ver as tarefas urgentes"
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "functionCall": {
          "name": "get_urgent_tasks",
          "args": {},
          "id": "ugRAp0nC"
        },
        "thoughtSignature": "EjQKMgEMOdbHPTNMfdXFR+mR3eOn+HZSlM9VXmgPw+jfdBVeU8MNYPX3wQeKLjtnfnIKyr/9"
      }
    ]
  },
  {
    "role": "tool",
    "parts": [
      {
        "functionResponse": {
          "name": "get_urgent_tasks",
          "response": {
            "type": "tasks",
            "tasks": [
              {
                "id": 13,
                "name": "Revisão de código",
                "description": "Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.",
                "priority": "Urgente",
                "estimated_hours": "2",
                "assignee": null,
                "space": "Desenvolvimento",
                "dueDate": "2026-05-14"
              },
              {
                "id": 25,
                "name": "Corrigir bug do login",
                "description": "O login está a falhar para vários utilizadores.",
                "priority": "Urgente",
                "estimated_hours": null,
                "assignee": null,
                "space": null,
                "dueDate": null
              },
              {
                "id": 28,
                "name": "Corrigir bug do login",
                "description": "O login está a falhar para vários utilizadores",
                "priority": "Urgente",
                "estimated_hours": null,
                "assignee": null,
                "space": null,
                "dueDate": null
              }
            ]
          }
        }
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "Estas são as suas tarefas urgentes:\n\nID 13: Revisao de codigo. Descricao: Revisao urgente do codigo no espaco de desenvolvimento para garantir a qualidade. Data limite: 2026-05-14. Espaco: Desenvolvimento.\n\nID 25: Corrigir bug do login. Descricao: O login esta a falhar para varios utilizadores.\n\nID 28: Corrigir bug do login. Descricao: O login esta a falhar para varios utilizadores.",
        "thoughtSignature": "EjQKMgEMOdbHFh8l2fVyTSBzIJLdoekebC+7AuWeWm29+koBxbLc54Kv/uo3SmEbi6mCJdxb"
      }
    ]
  }
]


isto são as tarefas [
  {
    id: 13,
    name: 'Revisão de código',
    description: 'Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade.',
    priority: 'Urgente',
    estimated_hours: '2',
    assignee: null,
    space: 'Desenvolvimento',
    dueDate: '2026-05-14'
  },
  {
    id: 25,
    name: 'Corrigir bug do login',
    description: 'O login está a falhar para vários utilizadores.',
    priority: 'Urgente',
    estimated_hours: null,
    assignee: null,
    space: null,
    dueDate: null
  },
  {
    id: 28,
    name: 'Corrigir bug do login',
    description: 'O login está a falhar para vários utilizadores',
    priority: 'Urgente',
    estimated_hours: null,
    assignee: null,
    space: null,
    dueDate: null
  }
]