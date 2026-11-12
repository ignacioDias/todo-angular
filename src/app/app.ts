import { Component, signal } from '@angular/core';
import { TaskGrid } from './tasks/task-grid/task-grid';
import { Header } from './header/header';
@Component({
  imports: [TaskGrid, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('todo');
}
