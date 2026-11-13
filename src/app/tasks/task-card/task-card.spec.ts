import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from '../task';
import { TaskCard } from './task-card';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  const task: Task = {
    id: 1,
    title: 'Comprar pan',
    description: 'Ir a la panadería',
    priority: 'medium',
    isCompleted: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', task);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
