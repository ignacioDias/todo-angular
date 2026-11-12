import { Component } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../task';
import { signal } from '@angular/core';
@Component({
  imports: [TaskCard],
  selector: 'app-task-grid',
  styleUrl: './task-grid.css',
  templateUrl: './task-grid.html',
})
export class TaskGrid {
  protected readonly tasks = signal<Map<number, Task>>(new Map());

  protected addTask(task: Task): void {
    this.tasks.update((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(task.id, task);
      return newMap;
    });
  }

  protected removeTask(taskId: number): void {
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
