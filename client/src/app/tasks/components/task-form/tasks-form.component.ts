import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from '../../models/task';

@Component({
  selector: 'tasks-form',
  template: `

      <div class="panel panel-default">
        <div class="panel-body">
              <div class="row">
        
              <form [formGroup]="taskForm" (ngSubmit)="onSubmit(taskForm)">
                  <div class="col-sm-10 col-xs-8">            
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Your new task..." formControlName="name">
                    </div>
  
                  </div><!-- /.col-xs-10--> 
                  <div class="col-sm-2 col-xs-4">
                    <button  class="btn btn-info btn-block" [disabled]="taskForm.invalid">ADD</button>
                  </div>
              </form> 
           </div>
      </div>
    </div>
  `,
  styleUrls: ['./tasks-form.component.scss']
})
export class TasksFormComponent implements OnInit {
 
  taskForm: FormGroup;

  // on form submit we emit out new event of type TASK
  @Output() onFormSubmit = new EventEmitter<Task>();

  constructor(public fb: FormBuilder) {}

  // initialize our form group
  ngOnInit() {
    this.taskForm = this.fb.group({
        name : ['', Validators.required],
    });
  }

  // on form submit emit value to parent container and reset the form
  onSubmit({ value, valid }: { value: Task, valid: boolean }) {
    this.onFormSubmit.emit(value);
    this.taskForm.reset();

  }
}
