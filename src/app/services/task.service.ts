import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { ITask } from "../Task.interface";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl: string = 'http://localhost:5000/tasks'

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl)
  }

  checkIfTaskExists(id: ITask["id"]): boolean {
    const task = this.getTasks().forEach((tasks) => tasks.filter((task) => task.id))

    if (!task) {
      return false
    }

    return true
  }

  deleteTask(id: ITask["id"]): Observable<ITask> {
    if (!this.checkIfTaskExists(id)) {
      console.log(`Task with id: ${id} doesn't exists`)
    }

    return this.http.delete<ITask>(`${this.apiUrl}/${id}`)
  }

  updateTaskReminder(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/${task.id}`, task, httpOptions)
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task, httpOptions)
  }

}
