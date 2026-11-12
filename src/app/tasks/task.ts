export interface Task {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly priority: Priority;
  readonly isCompleted: boolean;
}

type Priority = 'low' | 'medium' | 'high';
