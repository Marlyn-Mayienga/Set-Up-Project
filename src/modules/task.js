import TaskStore from './taskstore.js';

export default class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index + 1;
  }
}

// Update Task Completion State
export const updateTaskCompletion = (index) => {
  const tasks = TaskStore.getTasks();
  const task = tasks.find((task) => task.index === Number(index));
  const updatedTask = { ...task, completed: !task.completed };
  TaskStore.updateTask(updatedTask);
};

// Get Task
export const getTask = (task) => {
  const list = document.querySelector('.list');
  const item = document.createElement('li');
  item.classList.add('item');
  item.id = `item-${task.index}`;

  const checkbox = document.createElement('input');
  checkbox.dataset.index = task.index;
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');

  const taskText = document.createElement('p');
  taskText.dataset.index = task.index;
  taskText.classList.add('task-text');
  taskText.textContent = task.description;
  list.appendChild(item);
  item.appendChild(checkbox);
  item.appendChild(taskText);

  if (task.completed === true) {
    taskText.style.textDecoration = 'line-through';
    checkbox.checked = true;
    const itemTrash = document.createElement('i');
    itemTrash.classList.add('fa', 'fa-trash-alt', 'item-trash');
    item.appendChild(itemTrash);

    taskText.classList.toggle('done');
  } else {
    const itemDots = document.createElement('i');
    itemDots.classList.add('fa', 'fa-ellipsis-v', 'item-dots');
    item.appendChild(itemDots);
  }
};
