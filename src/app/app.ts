import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskGrid } from './tasks/task-grid/task-grid';
import { Header } from './header/header';
@Component({
  imports: [RouterOutlet, TaskGrid, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('todo');
}
