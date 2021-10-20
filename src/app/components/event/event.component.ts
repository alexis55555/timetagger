import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  private subscription: Subscription;
  time = '00:00:00';
  
  constructor(public eventService: EventService) { 
    this.checkForExistingEvent();
    this.subscription = interval(1000).subscribe(x => { this.updateTime(); });    
  }

  public toggleEvent() {
    this.eventService.toggleEvent();
  }

  updateTime() {
    this.time = this.eventService.getTime();
  }

  private checkForExistingEvent() {

  }

  isRunning() {
    return this.eventService.event.isRunning();
  }

}
