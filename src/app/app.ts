import { Component, signal, viewChild } from '@angular/core';
import { TaskGrid } from './tasks/task-grid/task-grid';
import { Header } from './header/header';
import { Task } from './tasks/task';
@Component({
  imports: [TaskGrid, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('todo');
  private readonly taskGrid = viewChild.required(TaskGrid);

  protected onTaskCreated(task: Task) {
    this.taskGrid().addTask(task);
  }
}
