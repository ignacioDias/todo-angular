import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from '../task';
import { TaskStore } from '../task-store';
import { TaskGrid } from './task-grid';

describe('TaskGrid', () => {
  let component: TaskGrid;
  let fixture: ComponentFixture<TaskGrid>;
  let store: TaskStore;

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Comprar pan',
      description: 'Ir a la panadería',
      priority: 'low',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Pagar factura',
      description: 'Vence mañana',
      priority: 'high',
      isCompleted: true,
    },
    {
      id: 3,
      title: 'Llamar a mamá',
      description: 'Confirmar la cena',
      priority: 'medium',
      isCompleted: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskGrid);
    component = fixture.componentInstance;
    store = TestBed.inject(TaskStore);
    store.tasks.set(new Map(tasks.map((task) => [task.id, task])));
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function host(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function cards(): NodeListOf<Element> {
    return host().querySelectorAll('app-task-card');
  }

  function selectAt(index: number): HTMLSelectElement {
    return host().querySelectorAll('select')[index] as HTMLSelectElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders every task and the total count when no filters are active', () => {
    expect(cards()).toHaveLength(3);
    expect(host().querySelector('.filter-summary')?.textContent).toContain('3 tareas');
    expect(host().querySelector('.clear-filters')).toBeNull();
  });

  it('filters tasks by title or description, ignoring case and accents', () => {
    const input = host().querySelector('input[type="search"]') as HTMLInputElement;
    input.value = 'MAMA';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(cards()).toHaveLength(1);
    expect(cards()[0].textContent).toContain('Llamar a mamá');
    expect(host().querySelector('.filter-summary')?.textContent).toContain('1 de 3 tareas');
  });

  it('filters tasks by priority and completion status', () => {
    const priority = selectAt(0);
    priority.value = 'high';
    priority.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(cards()).toHaveLength(1);

    const status = selectAt(1);
    status.value = 'pending';
    status.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(cards()).toHaveLength(0);
    expect(host().querySelector('.empty-state h3')?.textContent).toContain('Sin resultados');
  });

  it('clears all filters', () => {
    const input = host().querySelector('input[type="search"]') as HTMLInputElement;
    input.value = 'factura';
    input.dispatchEvent(new Event('input'));

    const priority = selectAt(0);
    priority.value = 'high';
    priority.dispatchEvent(new Event('change'));

    const status = selectAt(1);
    status.value = 'completed';
    status.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(cards()).toHaveLength(1);

    (host().querySelector('.filter-footer .clear-filters') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(cards()).toHaveLength(3);
    expect((host().querySelector('input[type="search"]') as HTMLInputElement).value).toBe('');
    expect(selectAt(0).value).toBe('all');
    expect(selectAt(1).value).toBe('all');
  });
});
