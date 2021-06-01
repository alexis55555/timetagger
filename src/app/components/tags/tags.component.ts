import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  @Input() event: Event;

  constructor(public eventService: EventService) { }

  add(tag: string) {
    this.event.addTag(tag)
    this.eventService.updateEvent(this.event);   
  }

  remove(i) {
    this.event.removeTag(i);
    this.eventService.updateEvent(this.event);
  }

}
