import { Component, OnInit } from '@angular/core';

import { TaskService } from "../../services/task.service";
import { ITask } from "../../Task.interface";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  tasks: ITask[] = []

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks)
  }

  deleteTask(id: ITask["id"]) {
    this.taskService.deleteTask(id).subscribe(() => this.tasks = this.tasks.filter((task) => task.id !== id))
  }

  toggleReminder(task: ITask) {
      task.reminder = !task.reminder

      this.taskService.updateTaskReminder(task).subscribe()
  }


  addTask(task: ITask){
      this.taskService.addTask(task).subscribe((task) => this.tasks.push(task))
  }

}
