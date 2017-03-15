import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../../models/task';

@Component({
  selector: 'tasks-list',
  template: `
    <li class="list-group-item" 
    [style.textDecoration]="(task.completed ? 'line-through' : '')"
    [class.text-muted]="task.completed"> 
      {{task.name}}
      <span  class="glyphicon glyphicon-remove" aria-hidden="true"
      (click)="removeTask()"></span>
      <span *ngIf="!task.completed"
      (click)="completeTask()"
      class="glyphicon glyphicon-ok" aria-hidden="true"></span>
    </li>
  `,
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
 
  @Input()
  task:Task;

  @Output()
  completed: EventEmitter<Task> = new EventEmitter<Task>();

  @Output()
  remove: EventEmitter<Task> = new EventEmitter<Task>();

  completeTask(){
    this.task.completed = true;
    this.completed.emit(this.task);
  }
  removeTask(){
    this.remove.emit(this.task);   
  }

}
