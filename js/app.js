import { addTask, removeTask, completeTask } from './taskManager.js'
import { loadTasks, saveTasks } from './localStorageManager.js'

// ... Código para adicionar ouvintes de eventos, chamar as funções etc.
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
// Carregar os itens da lista do Local Storage ao carregar a página
loadTasks()
