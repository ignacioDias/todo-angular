import { Component, output, viewChild } from '@angular/core';
import { Task } from '../tasks/task';
import { TaskDialog } from '../tasks/task-dialog/task-dialog';

@Component({
  imports: [TaskDialog],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected readonly taskCreated = output<Task>();
  private readonly taskDialog = viewChild.required(TaskDialog);

  protected openTaskDialog(): void {
    this.taskDialog().open();
  }

  protected onTaskSaved(task: Task): void {
    this.taskCreated.emit(task);
  }
}
