import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../task';
import { TaskDialog } from '../task-dialog/task-dialog';
import { TaskStore } from '../task-store';

type PriorityFilter = Task['priority'] | 'all';
type StatusFilter = 'all' | 'pending' | 'completed';

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase();
}

@Component({
  imports: [TaskCard, TaskDialog, MatIconModule],
  selector: 'app-task-grid',
  styleUrl: './task-grid.css',
  templateUrl: './task-grid.html',
})
export class TaskGrid {
  private readonly taskStore = inject(TaskStore);
  protected readonly tasks = this.taskStore.tasks;
  protected readonly editingTask = signal<Task | null>(null);
  protected readonly editDialogOpen = signal(false);

  protected readonly searchTerm = signal('');
  protected readonly priorityFilter = signal<PriorityFilter>('all');
  protected readonly statusFilter = signal<StatusFilter>('all');

  protected readonly filteredTasks = computed(() => {
    const query = normalize(this.searchTerm().trim());
    const priority = this.priorityFilter();
    const status = this.statusFilter();

    return [...this.tasks().values()].filter((task) => {
      if (priority !== 'all' && task.priority !== priority) {
        return false;
      }
      if (status === 'pending' && task.isCompleted) {
        return false;
      }
      if (status === 'completed' && !task.isCompleted) {
        return false;
      }
      if (query.length === 0) {
        return true;
      }
      return normalize(task.title).includes(query) || normalize(task.description).includes(query);
    });
  });

  protected readonly hasActiveFilters = computed(
    () =>
      this.searchTerm().trim().length > 0 ||
      this.priorityFilter() !== 'all' ||
      this.statusFilter() !== 'all',
  );

  protected readonly resultsLabel = computed(() => {
    const total = this.tasks().size;
    const visible = this.filteredTasks().length;
    const noun = total === 1 ? 'tarea' : 'tareas';
    return this.hasActiveFilters() ? `${visible} de ${total} ${noun}` : `${total} ${noun}`;
  });

  protected onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected onPriorityFilterChange(event: Event): void {
    this.priorityFilter.set((event.target as HTMLSelectElement).value as PriorityFilter);
  }

  protected onStatusFilterChange(event: Event): void {
    this.statusFilter.set((event.target as HTMLSelectElement).value as StatusFilter);
  }

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.priorityFilter.set('all');
    this.statusFilter.set('all');
  }

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
