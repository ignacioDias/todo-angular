import {
  Component,
  ElementRef,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../task';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-dialog',
  styleUrl: './task-dialog.css',
  templateUrl: './task-dialog.html',
})
export class TaskDialog {
  readonly task = input<Task | null>(null);
  readonly open = model(false);
  readonly saved = output<Task>();

  private readonly taskDialog = viewChild.required<ElementRef<HTMLDialogElement>>('taskDialog');

  protected readonly isEditing = computed(() => this.task() !== null);
  protected readonly submitAttempted = signal(false);
  protected readonly taskForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl<Task['priority'] | null>(null, Validators.required),
  });

  constructor() {
    effect(() => {
      const dialog = this.taskDialog().nativeElement;

      if (this.open()) {
        if (!dialog.open) {
          this.submitAttempted.set(false);
          this.resetForm(this.task());
          dialog.showModal();
        }
      } else if (dialog.open) {
        dialog.close();
      }
    });
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
      isCompleted: this.task()?.isCompleted ?? false,
    });
    this.close();
  }

  protected close(): void {
    this.open.set(false);
  }

  protected onDialogClose(): void {
    this.open.set(false);
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
