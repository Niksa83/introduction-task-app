import { Component, OnInit} from '@angular/core';
import { TaskService } from '../../task.service';

import { Task } from '../../models/task';

@Component({
  selector: 'tasks-dashboard',
  template: `
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
    <h1 class="text-muted text-center">Create a new task!</h1>
        <tasks-form (onFormSubmit)="handleNewTask($event)"></tasks-form>
        <hr />
    </div>  
  </div>

  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <ul class="list-group">

        <tasks-list 
        *ngFor="let task of tasks"
        [task]="task"
        (completed)="handleComplete($event)"
        (remove)="handleRemove($event)">
        </tasks-list>
        <!-- SAFE NAVIGATION OPERATOR ? -->
        <h5 class="text-muted"><strong> {{tasks?.length}}  </strong>  {{ (tasks?.length == 1) ? 'task' : 'tasks'}} left</h5>
      </ul>
    </div>
  </div>

  `,
  styleUrls: ['./tasks-dashboard.component.scss']
})
export class TasksDashboardComponent implements OnInit {

  tasks:Task[];

  constructor(
    private service : TaskService
  ){}
 
  ngOnInit(){
    this.service.getTasks()
      .subscribe((data: Task[]) => this.tasks = data);
  }

  handleNewTask(event:Task){
    // the only one in which we display new task from
    this.service.createTask(event)
    .subscribe((res:Task) => {
      this.tasks = [res, ...this.tasks];
    });
  }

  handleComplete(event:Task){
    this.service
      .updateTask(event)
      .subscribe((data: Task) => {
        this.tasks = this.tasks.map((task: Task) => {
          if (task._id === event._id) {
            task = Object.assign({}, task, event);
          }
          return task;
        });
      }); 
  }

  handleRemove(event:Task){
    this.service
      .removeTask(event)
      .subscribe((data: any) => {
        this.tasks = this.tasks.filter((tasks: Task) => {
          return tasks._id !== event._id;
        });
      });

  }
}
