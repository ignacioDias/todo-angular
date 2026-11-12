import { Component, input, output } from '@angular/core';
import { Task } from '../task';
import { MatIconModule } from '@angular/material/icon';
@Component({
  imports: [MatIconModule],
  selector: 'app-task-card',
  styleUrl: './task-card.css',
  templateUrl: './task-card.html',
})
export class TaskCard {
  readonly task = input.required<Task>();
  readonly edit = output<Task>();
  readonly remove = output<number>();
  readonly toggleCompletion = output<number>();
}
