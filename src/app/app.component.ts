import { Component } from '@angular/core';
import { User } from './models/user';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TimeTagger';

  constructor(public eventService: EventService) {
  }

  store() {
    this.eventService.store();
  }
  login() {
    this.eventService.googleSignin();
  }

  public getUser(): User {
    if (this.eventService.loggedInUser) {
      return this.eventService.loggedInUser;
    }
    return {displayName: "", email: "", photoURL: "", uid: ""}
  }
}
