import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// container components
import { TasksDashboardComponent } from './containers/tasks-dashboard/tasks-dasbhoard.component';

// components
import { TasksListComponent } from './components/task-list/tasks-list.component';
import { TasksFormComponent } from './components/task-form/tasks-form.component';

// service
import { TaskService } from './task.service';
 
@NgModule({
  declarations: [
    TasksDashboardComponent,
    TasksListComponent,
    TasksFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    // this module's components can use TaskService
    TaskService
  ],
  exports: [
    // only parent container compoent needs exporting
    TasksDashboardComponent
  ]
})
export class TasksModule {}