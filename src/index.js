import './styles.css';
import Task, { getTask } from './modules/task.js';
import TaskStore from './modules/taskstore.js';
import updateTaskStatus from './modules/taskstatus.js';

const getTasks = () => {
  const list = document.querySelector('.list');
  list.replaceChildren();
  TaskStore.getTasks().forEach((task) => getTask(task));
};

getTasks();

updateTaskStatus();

const taskForm = document.querySelector('.task-form');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.querySelector('#add-input').value;
  const task = new Task(description, false, TaskStore.getTasks().length);
  TaskStore.addTask(task);
  getTask(task);
  document.querySelector('.add-input').value = null;
});

// RESET//

document.querySelector('.reset-button').addEventListener('click', () => {
  const tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const allItems = document.querySelectorAll('.item');
  allItems.forEach((item) => {
    item.remove();
  });
  document.querySelector('.add-input').value = null;
});

// --DELETE SINGLE TASK--//

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash-alt')) {
    const { index } = e.target.parentElement.firstChild.dataset;
    const item = document.getElementById(`item-${index}`);

    TaskStore.removeTask(index);

    item.remove();

    getTasks();
  }
});

// -----REMOVE ALL DONE FROM THE LIST-----//

document.querySelector('.clear-button').addEventListener('click', () => {
  const tasks = TaskStore.getTasks();
  const doneTaskElements = Array.from(document.querySelectorAll('.done'));

  const doneTaskIndexes = doneTaskElements.map((doneTaskElement) => {
    const { index } = doneTaskElement.previousElementSibling.dataset;
    return Number(index);
  });

  const uncompletedTasks = tasks.filter((task) => !doneTaskIndexes.includes(task.index));

  localStorage.setItem('tasks', JSON.stringify(uncompletedTasks));
  doneTaskElements.forEach((doneTaskElement) => doneTaskElement.parentElement.remove());

  getTasks();
});

// -----EDIT-----//

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('task-text')) {
    const text = e.target;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('edit-input');
    editInput.value = text.textContent;
    text.parentElement.classList.add('editing');
    text.parentElement.replaceChild(editInput, text);

    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        editInput.parentElement.classList.remove('editing');

        const { index } = e.target.previousSibling.dataset;
        const task = TaskStore.getTaskByIndex(index);
        task.description = editInput.value;

        text.textContent = editInput.value;
        editInput.parentElement.replaceChild(text, editInput);

        TaskStore.updateTask(task);
      }
    });
  }
});