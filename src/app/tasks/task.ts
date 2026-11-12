export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  isCompleted: boolean;
}

type Priority = 'low' | 'medium' | 'high';
