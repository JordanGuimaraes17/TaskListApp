const taskInput = document.getElementById('taskInput')
const addTaskButton = document.getElementById('addTask')
const taskList = document.getElementById('taskList')

// que chama a função "addTask" quando o botão é clicado
addTaskButton.addEventListener('click', addTask)

// Função para adicionar uma nova tarefa à lista
function addTask() {
  // Capturando o texto da tarefa a partir do valor do campo de entrada, removendo espaços em branco extras
  const taskText = taskInput.value.trim()

  // Verificando se o texto da tarefa não está vazio
  if (taskText !== '') {
    // Criando um novo item de tarefa como um elemento "li"
    const taskItem = document.createElement('li')

    // Preenchendo o item de tarefa com HTML, incluindo o texto da tarefa e os botões "Concluir" e "Remover"
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <div class="button-container">
        <button class="completeButton">Concluir</button>
        <button class="removeButton">Remover</button>
      </div>
    `
    // Adicionando o item de tarefa à lista de tarefas
    taskList.appendChild(taskItem)

    // Limpando o campo de entrada
    taskInput.value = ''

    // Vinculando eventos de clique aos botões dentro do item de tarefa
    bindTaskEvents(taskItem)
  }
}

// Função para vincular eventos de clique aos botões dentro do item de tarefa
function bindTaskEvents(taskItem) {
  // Selecionando o botão "Concluir" e o botão "Remover" dentro do item de tarefa

  const completeButton = taskItem.querySelector('.completeButton')
  const removeButton = taskItem.querySelector('.removeButton')

  // Adicionando ouvintes de evento de clique aos botões, que chamam as funções "completeTask" e "removeTask"
  completeButton.addEventListener('click', completeTask)

  removeButton.addEventListener('click', removeTask)
}

// Função para marcar uma tarefa como concluída
function completeTask(event) {
  // Capturando o item de tarefa pai do botão clicado
  const taskItem = event.target.closest('li') // Selecionar o elemento <li> pai

  // Alternando a classe "completed" no item de tarefa para mostrar que está concluído
  taskItem.classList.toggle('completed')

  // Selecionando o <span> dentro do item de tarefa
  const taskText = taskItem.querySelector('span')

  if (taskText) {
    taskText.classList.toggle('completed') // Adicionar/Remover classe no <span>
  }
}

// Função para remover uma tarefa da lista
function removeTask(event) {
  // Capturando o item de tarefa pai do botão clicado
  const taskItem = event.target.closest('li')

  if (taskItem && taskItem.parentElement === taskList) {
    // Removendo o item de tarefa da lista de tarefas, apenas se estiver contido na lista
    taskList.removeChild(taskItem)
  }
}

// Adicionando ouvintes de evento de clique aos itens de tarefa existentes
// para vincular eventos aos botões dentro deles
taskList.querySelectorAll('li').forEach(taskItem => {
  bindTaskEvents(taskItem)
})
