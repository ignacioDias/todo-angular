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
  protected readonly tasks = signal<Task[]>([
    { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1' , isCompleted: false, priority: 'medium'},
    { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2' , isCompleted: false, priority: 'high'},
    { id: 3, title: 'Tarea 3', description: 'Descripción de la tarea 3' , isCompleted: true, priority: 'low'}
  ]);
}
