import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Event, IEvent } from '../models/event';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class EventService {
  event: Event = new Event();
  storage: AngularFirestoreDocument;
  loggedInUser: User;

  constructor(private firestore: AngularFirestore) {
  }

  init(user: User) {
    this.loggedInUser = user;
    this.storage = this.firestore.collection('users').doc(this.loggedInUser.uid)
    
    
    this.storage.collection("events").doc("currentEvent").valueChanges().subscribe((s:any) => {
      console.log(s);
      const e = s;
      this.event.startDate = e.startDate.toDate();
      this.event.endDate = e.endDate.toDate();
      this.event.tags = e.tags;
    })
    
  }

  private async startEvent() {    
    this.event.start();


    const e: IEvent = {endDate: this.event.endDate, tags: this.event.tags, startDate: this.event.startDate};
    await this.storage.collection("events").doc("currentEvent").delete()
    this.storage.collection("events").doc("currentEvent")
                .set(e)
                .then(res => {}, err => console.log(err));
  }

  public storeEvent(event: IEvent) {
    const e = {endDate: event.endDate, startDate: event.startDate, tags: event.tags};
    this.storage.collection<IEvent>("events")
                .add(e)
                .then(res => {}, err => console.log(err));
  }

  public toggleEvent() {
    if (this.event.isRunning()) {
      this.event.stop();
      this.storeEvent(this.event);
    }else {
      this.startEvent();
    }
  }

  getTime() {
    return this.event.getTime();
  }
}
