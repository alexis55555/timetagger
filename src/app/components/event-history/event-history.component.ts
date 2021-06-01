import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css']
})
export class EventHistoryComponent {

  constructor(public eventService: EventService) {
    
  }

}
