import { Component, inject, signal } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../task';
import { TaskDialog } from '../task-dialog/task-dialog';
import { TaskStore } from '../task-store';

@Component({
  imports: [TaskCard, TaskDialog],
  selector: 'app-task-grid',
  styleUrl: './task-grid.css',
  templateUrl: './task-grid.html',
})
export class TaskGrid {
  private readonly taskStore = inject(TaskStore);
  protected readonly tasks = this.taskStore.tasks;
  protected readonly editingTask = signal<Task | null>(null);
  protected readonly editDialogOpen = signal(false);

  protected onEditTask(task: Task): void {
    this.editingTask.set(task);
    this.editDialogOpen.set(true);
  }

  protected onEditDialogOpenChange(open: boolean): void {
    this.editDialogOpen.set(open);
    if (!open) {
      this.editingTask.set(null);
    }
  }

  protected onTaskSaved(task: Task): void {
    this.taskStore.updateTask(task);
  }

  protected onRemoveTask(taskId: number): void {
    this.taskStore.removeTask(taskId);
  }

  protected onToggleTaskCompletion(taskId: number): void {
    this.taskStore.toggleTaskCompletion(taskId);
  }
}
