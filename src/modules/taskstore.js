export default class TaskStore {
    static getTasks = () => {
      let tasks = [];

      if (localStorage.getItem('tasks') === null) {
        return tasks;
      }

      tasks = JSON.parse(localStorage.getItem('tasks'));
      return tasks;
    }

    static getTaskByIndex = (index) => {
      const tasks = TaskStore.getTasks();

      const task = tasks.find((task) => Number(task.index) === Number(index));
      return task;
    }

    static addTask = (task) => {
      const tasks = TaskStore.getTasks();
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask = (index) => {
      const tasks = TaskStore.getTasks()
        .filter((task) => Number(task.index) !== Number(index))
        .map((task, index) => ({ ...task, index: index + 1 }));

      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static updateTask = (updatedTask) => {
      let tasks = TaskStore.getTasks();

      tasks = tasks.map((task) => {
        if (task.index === updatedTask.index) {
          return updatedTask;
        }
        return task;
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}