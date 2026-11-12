import { Component, signal, viewChild } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../task';
import { TaskDialog } from '../task-dialog/task-dialog';
@Component({
  imports: [TaskCard, TaskDialog],
  selector: 'app-task-grid',
  styleUrl: './task-grid.css',
  templateUrl: './task-grid.html',
})
export class TaskGrid {
  protected readonly tasks = signal<Map<number, Task>>(new Map());
  private readonly taskDialog = viewChild.required(TaskDialog);

  addTask(task: Task): void {
    if (this.tasks().has(task.id)) {
      console.warn(`Task with id ${task.id} already exists. Skipping add.`);
      return;
    }
    this.tasks.update((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(task.id, task);
      return newMap;
    });
  }

  updateTask(task: Task): void {
    this.tasks.update((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(task.id, task);
      return newMap;
    });
  }

  protected onEditTask(task: Task): void {
    this.taskDialog().open(task);
  }

  protected onTaskSaved(task: Task): void {
    this.updateTask(task);
  }

  removeTask(taskId: number): void {
    this.tasks.update((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(taskId);
      return newMap;
    });
  }

  protected toggleTaskCompletion(taskId: number): void {
    this.tasks.update(prevMap => {
      const newMap = new Map(prevMap);
      const task = newMap.get(taskId);
      if (task) {
        newMap.set(taskId, {
          ...task,
          isCompleted: !task.isCompleted
        });
      }
      return newMap;
    });
  }
}
