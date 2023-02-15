import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TodoListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should add a task', () => {
    const newTask = 'Task 1';
    const addTaskButton = fixture.nativeElement.querySelector('button');
    const input = fixture.nativeElement.querySelector('input');
    input.value = newTask;
    input.dispatchEvent(new Event('input'));
    addTaskButton.click();
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe(newTask);
    expect(component.tasks[0].status).toBe('New');
    expect(component.tasks[0].number).toBe(1);
    expect(component.tasks[0].created instanceof Date).toBe(true);
    expect(component.tasks[0].updated instanceof Date).toBe(true);
  });

  it('should delete a task', () => {
    component.tasks = [
      {
        title: 'Task 1',
        status: 'New',
        created: new Date(),
        updated: new Date(),
        number: 1,
      },
    ];

    fixture.detectChanges();
    component.deleteTask(0);
    /* const deleteTaskButton = fixture.nativeElement.querySelector('delete-button');
    deleteTaskButton.click(); */
    expect(component.tasks.length).toBe(0);
  });

  /*   it('should edit a task', () => {
    component.tasks = [
      {
        title: 'Task 1',
        status: 'New',
        created: new Date(),
        updated: new Date(),
        number: 1,
      },
    ];

    fixture.detectChanges();

    const editTaskButton = fixture.nativeElement.querySelectorAll('button')[1];
    const input = fixture.nativeElement.querySelector('input');
    const newTitle = 'New Task Title';
    input.value = newTitle;
    input.dispatchEvent(new Event('input'));
    editTaskButton.click();
    expect(component.tasks[0].title).toBe(newTitle);
    expect(component.tasks[0].updated instanceof Date).toBe(true);
  }); */

  /*   it('should not edit a task with empty title', () => {
    component.tasks = [
      {
        title: 'Task 1',
        status: 'New',
        created: new Date(),
        updated: new Date(),
        number: 1,
      },
    ];

    fixture.detectChanges();

    const editTaskButton = fixture.nativeElement.querySelectorAll('button')[1];
    const input = fixture.nativeElement.querySelector('input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    editTaskButton.click();
    expect(component.tasks[0].title).toBe('Task 1');
    expect(component.tasks[0].updated).toBe(component.tasks[0].created);
  }); */

  it('should display "No tasks present" when tasks array is empty', () => {
    component.tasks = [];
    fixture.detectChanges();
    const message = fixture.nativeElement.querySelector('p');
    expect(message.textContent).toContain('No tasks present');
  });

  it('should display tasks when tasks array is not empty', () => {
    component.tasks = [
      {
        title: 'Task 1',
        status: 'New',
        created: new Date(),
        updated: new Date(),
        number: 1,
      },
      {
        title: 'Task 2',
        status: 'New',
        created: new Date(),
        updated: new Date(),
        number: 2,
      },
    ];
    fixture.detectChanges();
    const tasks = fixture.nativeElement.querySelectorAll('li');
    expect(tasks.length).toBe(2);
    expect(tasks[0].querySelector('span').textContent).toContain('Task 1');
    expect(tasks[1].querySelector('span').textContent).toContain('Task 2');
  });
});
