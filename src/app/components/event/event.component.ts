import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  constructor(public eventService: EventService) { 
    this.checkForExistingEvent();
  }

  public startEvent() {

  }

  public stopEvent() {

  }

  private checkForExistingEvent() {

  }
}
