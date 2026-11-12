import { Component, inject, signal } from '@angular/core';
import { Task } from '../tasks/task';
import { TaskDialog } from '../tasks/task-dialog/task-dialog';
import { TaskStore } from '../tasks/task-store';

@Component({
  imports: [TaskDialog],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private readonly taskStore = inject(TaskStore);
  protected readonly isDialogOpen = signal(false);

  protected openTaskDialog(): void {
    this.isDialogOpen.set(true);
  }

  protected onTaskSaved(task: Task): void {
    this.taskStore.addTask(task);
  }
}
