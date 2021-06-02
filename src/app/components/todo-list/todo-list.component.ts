import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/models/todo';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  constructor(public eventService: EventService) { }

  public complete(toDo: ToDo, done: boolean) {    
    toDo.doneAt = done ? new Date() : null;
    this.eventService.updateToDo(toDo);
  }

  public addToDo(toDoDesc: string) {
    const toDo: ToDo = {createdAt: new Date(), desc: toDoDesc};
    this.eventService.addToDo(toDo);
  }
}
