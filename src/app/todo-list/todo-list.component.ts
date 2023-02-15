import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  editTaskTitle: string = '';
  editTaskId: number | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(this.tasks)
    });
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) {
      return;
    }
    const task: Task = { title, status: 'New', created: new Date() };
    this.taskService.addTask(task).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    });
  }

  deleteTask(task: Task): void {
    const id = task.id;
    if (typeof id !== 'undefined') {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter((t) => t.id !== id);
      });
    }
  }

  /* beginEdit(task: Task): void {
    if (typeof task.id !== 'undefined') {
      this.editTaskId = task.id;
    }

    this.editTaskTitle = task.title;
  }*/

  endEdit(): void {
    this.editTaskId = null;
    this.editTaskTitle = '';
  }

  editTask(task: Task): void {
    if (typeof task.id !== 'undefined') {
      this.editTaskId = task.id;
    }
    this.editTaskTitle = task.title;
  }

  updateTask(): void {
    if (!this.editTaskId || !this.editTaskTitle) {
      return;
    }
    const task = this.tasks.find((t) => t.id === this.editTaskId);
    if (!task) {
      return;
    }
    task.title = this.editTaskTitle.trim();
    task.updated = new Date();
    this.taskService.updateTask(task).subscribe(() => {
      this.editTaskId = null;
      this.editTaskTitle = '';
    });
  }
}
