import { Component } from '@angular/core';
import { Task } from '../task';
import { input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  imports: [MatIconModule],
  selector: 'app-task-card',
  styleUrl: './task-card.css',
  templateUrl: './task-card.html',
})
export class TaskCard {
  readonly task = input.required<Task>();
}
