const taskInput = document.getElementById('taskInput')
const addTaskButton = document.getElementById('addTask')
const taskList = document.getElementById('taskList')

// Carregar os itens da lista do Local Storage ao carregar a página
window.addEventListener('load', loadTasks)

// Adicionar ouvinte de evento de teclado ao campo de entrada de texto
taskInput.addEventListener('keydown', function (event) {
  // Verificar se a tecla pressionada é "Enter" (código 13)
  if (event.keyCode === 13) {
    // Chamar a função addTask quando a tecla "Enter" for pressionada
    addTask()
  }
})

// que chama a função "addTask" quando o botão é clicado
addTaskButton.addEventListener('click', addTask)

// Função para verificar se uma tarefa já está na lista
function isTaskInList(taskText) {
  const tasks = taskList.querySelectorAll('li span')
  for (const task of tasks) {
    if (task.textContent === taskText) {
      return true // Tarefa já está na lista
    }
  }
  return false // Tarefa não está na lista
}

// Função para adicionar uma nova tarefa à lista
function addTask() {
  // Capturando o texto da tarefa a partir do valor do campo de entrada, removendo espaços em branco extras
  const taskText = taskInput.value.trim()

  // Verificando se o texto da tarefa não está vazio e se já não existe na lista
  if (taskText !== '') {
    if (isTaskInList(taskText)) {
      // Exibir mensagem de item já cadastrado
      alert('Item já cadastrado na lista.')
    } else {
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

      // Salvar os itens da lista no Local Storage
      saveTasks()
    }
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

  // Salvar os itens da lista no Local Storage
  saveTasks()
}

// Função para remover uma tarefa da lista
function removeTask(event) {
  // Capturando o item de tarefa pai do botão clicado
  const taskItem = event.target.closest('li')

  if (taskItem && taskItem.parentElement === taskList) {
    // Removendo o item de tarefa da lista de tarefas, apenas se estiver contido na lista
    taskList.removeChild(taskItem)

    // Salvar os itens da lista no Local Storage
    saveTasks()
  }
}

// Função para carregar os itens da lista do Local Storage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    taskList.innerHTML = savedTasks
    taskList.querySelectorAll('li').forEach(taskItem => {
      bindTaskEvents(taskItem)
    })
  }
}

// Função para salvar os itens da lista no Local Storage
function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML)
}

// Carregar os itens da lista do Local Storage ao carregar a página
loadTasks()
