import { updateTaskCompletion } from './task.js';
import TaskStore from './taskstore.js';

const updateTaskStatus = () => {
  // DONE TASKS //
  document.querySelector('.list').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const checkboxIndex = e.target.dataset.index;
      const item = document.getElementById(`item-${checkboxIndex}`);
      const taskText = item.querySelector('p');

      item.classList.toggle('item-checked');

      updateTaskCompletion(checkboxIndex);

      const task = TaskStore.getTaskByIndex(checkboxIndex);

      const checkbox = item.querySelector('input');

      const itemAction = item.querySelector('i');
      itemAction.className = '';

      taskText.classList.toggle('done');

      if (task.completed === true) {
        taskText.style.textDecoration = 'line-through';
        checkbox.checked = true;
        itemAction.classList.add('fa', 'fa-trash-alt');
      } else {
        taskText.style.textDecoration = 'none';
        checkbox.checked = false;
        const itemDots = item.querySelector('i');
        itemDots.classList.add('fa', 'fa-ellipsis-v');
      }
    }
  });
};
export default updateTaskStatus;