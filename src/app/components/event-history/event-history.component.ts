import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css']
})
export class EventHistoryComponent {
  selectedEvent: Event;
  @ViewChild('eventDetail') eventDetail: ElementRef;

  constructor(public eventService: EventService) {
    
  }

  selectEvent(event: Event) {
    this.selectedEvent = event;
  }

  hideEventDetail() {
    this.selectedEvent = null;
  }
}
