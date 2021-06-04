import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {

  @Input() event: Event;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(public eventService: EventService) {}

  public delte() {
    this.eventService.delteEvent(this.event);
    this.close.emit();
  }
}
