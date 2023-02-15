import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task: Task | undefined;
  tasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.task = tasks.find(
        (element) =>
          element.id === Number(this.route.snapshot.paramMap.get('id'))
      );

      console.log(this.task);
      console.log(this.tasks);
    });
  }

  /* getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe((task) => {
      console.log(task)
      this.task = task;
      
    });
  } */

  goBack(): void {
    this.location.back();
  }

  updateTask(): void {
    if (this.task) {
      this.taskService.updateTask(this.task).subscribe(() => {
        /* console.log(`Task ${this.task.id} updated`); */
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'New':
        return 'blue';
      case 'Ongoing':
        return 'orange';
      case 'Canceled':
        return 'red';
      case 'Completed':
        return 'green';
      default:
        return 'black';
    }
  }
}
