import { Service, signal } from '@angular/core';
import { Task } from './task';

@Service()
export class TaskStore {
  readonly tasks = signal<Map<number, Task>>(new Map());

  addTask(task: Task): void {
    if (this.tasks().has(task.id)) {
      console.warn(`Task with id ${task.id} already exists. Skipping add.`);
      return;
    }
    this.saveTask(task);
  }

  updateTask(task: Task): void {
    this.saveTask(task);
  }

  removeTask(taskId: number): void {
    this.tasks.update((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(taskId);
      return newMap;
    });
  }

  toggleTaskCompletion(taskId: number): void {
    this.tasks.update((prevMap) => {
      const newMap = new Map(prevMap);
      const task = newMap.get(taskId);
      if (task) {
        newMap.set(taskId, {
          ...task,
          isCompleted: !task.isCompleted,
        });
      }
      return newMap;
    });
  }

  private saveTask(task: Task): void {
    this.tasks.update((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(task.id, task);
      return newMap;
    });
  }
}
