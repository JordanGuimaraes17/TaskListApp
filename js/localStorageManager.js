import { bindTaskEvents } from './taskManager.js'
// Função para carregar os itens da lista do Local Storage
export function loadTasks() {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    taskList.innerHTML = savedTasks
    taskList.querySelectorAll('li').forEach(taskItem => {
      bindTaskEvents(taskItem)
    })
  }
}

// Função para salvar os itens da lista no Local Storage
export function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML)
}
