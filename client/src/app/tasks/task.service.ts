import { Injectable } from '@angular/core';
import { Task }           from './models/task';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Observables and RXJS operators needed (map, catch, throw)
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const TASK_API: string = '/api/tasks';

@Injectable()
export class TaskService {

  constructor (private http: Http) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get(TASK_API)
      .map((res: Response) => {
        let body = res.json();
        return body.data || { };       
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  createTask(task:Task): Observable<any> {
    let body = task;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // fetch the new task from the API inside task property
     return this.http.post(TASK_API, body, options)
                    .map(res => {
                      let body = res.json();
                      return body.task;
                    });
  }


  updateTask(task: Task): Observable<Task> {
    // set headers
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    // add above headers to property in RequestOptions
    let options = new RequestOptions({
      headers: headers
    });
    // make a PUT request to task/:id containing task and above options
    return this.http
      .put(`${TASK_API}/${task._id}`, task, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeTask(task: Task): Observable<Task> {
    return this.http
      .delete(`${TASK_API}/${task._id}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }


}
