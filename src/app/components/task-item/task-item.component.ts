import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TaskService } from "../../services/task.service"
import {ITask} from "../../Task.interface";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: ITask
  @Output() onDeleteTask: EventEmitter<ITask["id"]> = new EventEmitter()
  @Output() onToggleReminder: EventEmitter<ITask> = new EventEmitter()

  faTimes = faTimes

  constructor() {
    this.task = {id: 0, day: "", reminder: false, text: ""}
  }

  ngOnInit(): void {
  }

  onDelete(id: ITask["id"]) {
    this.onDeleteTask.emit(id)
  }

  onToggle(task: ITask) {
    this.onToggleReminder.emit(task)
  }

}
