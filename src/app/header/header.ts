import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../tasks/task';
import { TaskDialog } from '../tasks/task-dialog/task-dialog';
import { TaskStore } from '../tasks/task-store';
import { ThemeStore } from '../theme/theme-store';

@Component({
  imports: [MatIconModule, TaskDialog],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private readonly taskStore = inject(TaskStore);
  protected readonly themeStore = inject(ThemeStore);
  protected readonly isDialogOpen = signal(false);

  protected openTaskDialog(): void {
    this.isDialogOpen.set(true);
  }

  protected onTaskSaved(task: Task): void {
    this.taskStore.addTask(task);
  }

  protected toggleTheme(): void {
    this.themeStore.toggle();
  }
}
