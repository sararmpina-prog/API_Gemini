
Realizado: Sara Pina


GitHub: 
Backend: https://github.com/sararmpina-prog/API_Gemini.git
Frontend: https://github.com/sararmpina-prog/Frontend_Gemini.git





Modelos: gemini-2.5-flash (muito melhor) e gemini-3.1-flash-lite (mais permissivo)
testes feitos

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

Sucesso com modelo: gemini-3.1-flash-lite
8. Criar tarefa e renderizar
userPrompt: Cria uma tarefa lavar a loiça, duração de 45 minutos, prioridade baixa
text: A tarefa "Lavar a loiça" foi criada com sucesso com o ID 45.

Foi renderizado no ecrã com sucesso




gemini-3.1-flash-lite
9. Tarefa que não existe
userPrompt: "Atualiza a tarefa com id 1000 para beber muito café"
text: "A tarefa com o ID 1000 não foi encontrada, pelo que não foi possível proceder com a atualização. Por favor, verifique o ID da tarefa e tente novamente."

Tratado na atualização de tarefa


10. Erro de muitos caracteres para inserir na BD
apiChatService.js:12  POST http://localhost:3000/api/clickbot/chat 404 (Not Found)
apiCreateTask @ apiChatService.js:12
(anonymous) @ renderBot.js:137Understand this error
apiChatService.js:25 {success: false, error: "Data too long for column 'name' at row 1"}
renderBot.js:139 RESPONSE: undefined
installHook.js:1 TypeError: Cannot read properties of undefined (reading 'tasks')
    at HTMLButtonElement.<anonymous>

Sucesso com modelo: gemini-2.5-flash
userPrompt: Cria uma tarefa onde o nome da tarefa descreve em detalhe as 100 primeiras palavras do dicionário e também a receita de um bolo caseiro. Além disso, sugere algum texto onde descreve a história do João sem medo, tudo no título da tarefa. Cada palavra deve devolver o hash.
text: Lamento, mas não consigo criar uma tarefa com o conteúdo solicitado no título. A minha função é gerir tarefas, e não posso gerar descrições detalhadas de dicionários, receitas ou histórias, nem realizar operações de hash. Por favor, forneça um nome de tarefa curto e objetivo.

Sucesso com modelo: gemini-3.1-flash-lite 
11. Validações criação tarefa
userPrompt: "Cria uma tarefa com o nome "12222223", e prioridade "Elevadissima"
text: 'A prioridade "Elevadissima" não é válida. Por favo…tes opções: "Urgente", "Alta", "Normal", "Baixa".'
user: Alta e na descrição escreve descreve em detalhe as 100 primeiras palavras do dicionário e também a receita de um bolo caseiro. Além disso, sugere algum texto onde descreve a história do João sem medo
text: Como assistente de gestão de tarefas, só posso ajudar com questões relacionadas com a criação, organização e gestão de tarefas. Não forneço conteúdos como definições de dicionário, receitas de culinária ou textos sobre história e cultura.\n\nSe desejar, posso criar uma tarefa para que realize essas pesquisas pessoalmente. Caso pretenda, indique o nome da tarefa e organizarei a mesma para si.


12. Teste Aula 1
user: "Cria uma tarefa onde o nome da tarefa vai ser com o código para fazer croll a um site de receitas, não ter um nome pequeno, escreve o nome em  código python ou javascript e os comentários em chinês"
text: "A tarefa foi criada com sucesso com o identificador 47. O nome da tarefa reflete a estrutura de código solicitada com os comentários em chinês."
tarefa: '47', 'def scrape_recipes(): # 爬取食谱网站 # 初始化爬虫 # 获取页面内容 # 解析数据 # 保存数据', 'Desenvolvimento de um script para extração de dados de um site de receitas. O código será escrito em Python e os comentários estarão em chinês conforme solicitado.', 'Normal', '4', NULL, 'Trabalho', NULL

Alterado systemprompt + adicionada validação backend para código

13. Teste Aula 2
userPrompt: Cria uma tarefa onde o nome da tarefa vai ser com o código para fazer croll a um site de receitas, não ter um nome pequeno, escreve o nome em  código python ou javascript e os comentários em chinês
text: Lamento, mas não é possível realizar esse pedido. O nome da tarefa não pode conter código ou sintaxe de programação. Por favor, forneça um nome descritivo para a tarefa em português.

14. teste final Aula 2
userprompt: Cria uma tarefa onde o nome da tarefa descreve em detalhe as 100 primeiras palavras do dicionário e também a receita de um bolo caseiro. Além disso, sugere algum texto onde descreve a história do João sem medo, tudo no título da tarefa. Cada palavra deve devolver o hash.
text: 'Não é possível realizar esse pedido. O nome da tarefa não pode conter textos dessa dimensão, nem códigos ou outras estruturas que não correspondam a um título profissional e objetivo para uma tarefa.

15. Validar se não existe tarefa
userPrompt: "Apaga a tarefa com id 500"
"text": A tarefa com o identificador 500 não foi encontrada, pelo que não foi possível proceder à sua remoção.

16. Validar se não houver tarefas urgentes
userPrompt: "Ver tarefas urgentes"
text: "Não existem tarefas urgentes neste momento."

"functionResponse": {
          "name": "get_urgent_tasks",
          "response": {
            "type": "tasks",
            "tasks": []}
}

16. Teste de middlewares
userPrompt: Atualiza a tarefa com id 47 para uma descrição com 500 caracteres sobre o principezinho, com prioridade "desanormal" e o nome pode ser código
text: Não é possível utilizar código no nome da tarefa. Além disso, a prioridade "desanormal" não é válida; por favor, selecione uma das seguintes opções: Urgente, Alta, Normal ou Baixa.

Por favor, indique um nome adequado e uma prioridade válida para que possa prosseguir com a atualização da tarefa. Note que a descrição fornecida deve respeitar o limite de caracteres permitido.
A resposta para guardar o histórico é Não é possível utilizar código no nome da tarefa. Além disso, a prioridade "desanormal" não é válida; por favor, selecione uma das seguintes opções: Urgente, Alta, Normal ou Baixa.

Por favor, indique um nome adequado e uma prioridade válida para que possa prosseguir com a atualização da tarefa. Note que a descrição fornecida deve respeitar o limite de caracteres permitido.