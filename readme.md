
Realizado: Sara Pina
GitHub: 
Backend: https://github.com/sararmpina-prog/API_Gemini.git
Frontend: https://github.com/sararmpina-prog/Frontend_Gemini.git


Modelos: gemini-2.5-flash e gemini-3.1-flash-lite

9:25 - Sexta-feira (15/05)

Sucesso com modelo: gemini-2.5-flash

1. Criar tarefa (uma só tarefa) (Fez 1 steps - 2º STEP [])

userPrompt: "Ir beber café com o pessoal"
text: 'A tarefa "Ir beber café com o pessoal" foi criada com sucesso com o ID 43.'
Renderizada no ecrã e criada com sucesso


Sucesso com modelo: gemini-2.5-flash

2. Multitask (3 pedidos diferentes, criar, atualizar e apagar) (Fez 2 steps - 3º STEP [])
userPrompt: "Cria a tarefa decidir almoço de segunda, e depois atualiza essa tarefa para marcar almoço de segunda e apaga a tarefa com id 39"
text: A tarefa "decidir almoço de segunda" foi criada com sucesso com o ID 44.
Em seguida, a tarefa com o ID 44 foi atualizada para "marcar almoço de segunda".
A tarefa com o ID 39 foi apagada com sucesso.

🔁 STEP 3
Funções pedidas pelo modelo:
functionCalls []


Sucesso com modelo: gemini-2.5-flash
3. Ver tarefas urgentes e atualizar tarefa (multitask)
userPrompt: "Mostra as tarefas urgentes e atualiza a tarefa com id 5 para testar texto com gemini e colocar no readme"
text: isto são os textos As tarefas urgentes são:
- ID 13: Revisão de código (Urgente, para 2026-05-14, 2 horas estimadas)
- ID 25: Corrigir bug do login (Urgente)
- ID 28: Corrigir bug do login (Urgente)

A tarefa com o ID 5 foi atualizada com sucesso para "Testar texto com Gemini" e a tag "readme".

🔁 STEP 2
Funções pedidas pelo modelo:
functionCalls []

4. Ver tarefas urgentes
userPrompt: "Mostra as tarefas urgentes"
text: 'As suas tarefas urgentes são:\n' +
    '- ID 13: Revisão de código (Urgente, para 2026-05-14, 2 horas estimadas)\n' +
    '- ID 25: Corrigir bug do login (Urgente)\n' +
    '- ID 28: Corrigir bug do login (Urgente)',

Problema: renderização das tarefas urgentes

Alterado FRONTEND

Sucesso com modelo: gemini-2.5-flash
5. Repetido: Ver tarefas urgentes
userPrompt: "Ver tarefas urgentes e dá-me uma frase motivacional"
text: Aqui estão as suas tarefas urgentes:

*   **ID 13**: Revisão de código (Prioridade: Urgente) - Revisão urgente do código no espaço de desenvolvimento para garantir a qualidade. Com vencimento em 2026-05-14 e 2 horas estimadas.
*   **ID 25**: Corrigir bug do login (Prioridade: Urgente) - O login está a falhar para vários utilizadores.
*   **ID 28**: Corrigir bug do login (Prioridade: Urgente) - O login está a falhar para vários utilizadores.

Não consigo gerar frases motivacionais. Posso ajudar com mais alguma coisa relacionada com as suas tarefas?


🔁 STEP 2
Funções pedidas pelo modelo:
functionCalls []



Sucesso com modelo: gemini-2.5-flash
6. Repetido: Ver tarefas urgentes
Tudo igual, formatação certa no chatbot


Sucesso com modelo: gemini-3.1-flash-lite
7. Texto - testar
userPrompt: "Olá tudo bem?"
text: Olá! Tudo bem, obrigado. Como posso ajudar com a gestão das tuas tarefas hoje?

userPrompt: Não quero gerir tarefas. Dá-me uma receita de um bolo.
"text": Como sou um assistente especializado na gestão de tarefas, o meu foco principal é ajudar-te com a tua produtividade e organização. Infelizmente, não consigo fornecer receitas de culinária.


8. Criar tarefa e renderizar
userPrompt: Cria uma tarefa lavar a loiça, duração de 45 minutos, prioridade baixa
text: A tarefa "Lavar a loiça" foi criada com sucesso com o ID 45.

Foi renderizado no ecrã com sucesso