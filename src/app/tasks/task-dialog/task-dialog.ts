import { Component, ElementRef, computed, output, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../task';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-dialog',
  styleUrl: './task-dialog.css',
  templateUrl: './task-dialog.html',
})
export class TaskDialog {
  readonly saved = output<Task>();

  private readonly editingTask = signal<Task | null>(null);
  private readonly taskDialog = viewChild.required<ElementRef<HTMLDialogElement>>('taskDialog');

  protected readonly isEditing = computed(() => this.editingTask() !== null);
  protected readonly submitAttempted = signal(false);
  protected readonly taskForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl<Task['priority'] | null>(null, Validators.required),
  });

  open(task: Task | null = null): void {
    this.editingTask.set(task);
    this.submitAttempted.set(false);
    this.resetForm(task);

    const dialog = this.taskDialog().nativeElement;
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  protected onSubmit(): void {
    this.submitAttempted.set(true);
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const { id, title, description, priority } = this.taskForm.getRawValue();
    if (id === null || title === null || description === null || priority === null) {
      return;
    }

    this.saved.emit({
      id,
      title,
      description,
      priority,
      isCompleted: this.editingTask()?.isCompleted ?? false,
    });
    this.close();
  }

  protected close(): void {
    const dialog = this.taskDialog().nativeElement;
    if (dialog.open) {
      dialog.close();
    }
  }

  protected onDialogClose(): void {
    this.editingTask.set(null);
    this.submitAttempted.set(false);
    this.resetForm(null);
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  private resetForm(task: Task | null): void {
    this.taskForm.reset({
      id: task?.id ?? null,
      title: task?.title ?? '',
      description: task?.description ?? '',
      priority: task?.priority ?? null,
    });
  }
}
