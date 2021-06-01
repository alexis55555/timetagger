import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Event, IEvent } from '../models/event';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class EventService {
  event: Event = new Event();
  storage: AngularFirestoreDocument;
  loggedInUser: User;
  events: Event[] = [];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource([]);;
  constructor(private firestore: AngularFirestore) {
  }

  init(user: User) {
    this.loggedInUser = user;
    this.storage = this.firestore.collection('users').doc(this.loggedInUser.uid)
    
    
    this.storage.collection("events").doc("currentEvent").valueChanges().subscribe(s => {    
      this.event = Event.createFromBackend(s)
    })


    this.getEvents().subscribe(es => {
      if (es) {     
        this.events = es.map(e => Event.createFromBackend(e));
        this.dataSource.data = this.events;
      }
    })
    
  }

  getEvents() {
    return this.storage.collection("events", ref => ref.orderBy('startDate','desc')).valueChanges();
  }

  private async startEvent() {    
    this.event.start();
   this.updateCurrentEvent();
  }

  private updateCurrentEvent() {
    const e: IEvent = {id: "currentEvent", endDate: this.event.endDate, tags: this.event.tags, startDate: this.event.startDate, duration: this.event.getTime()};    
    this.storage.collection("events")
                .doc(e.id)
                .set(e)
                .then(res => {}, err => console.log(err));
  }

  public storeEvent(event: Event) {
    const id = this.firestore.createId();
    const e = {id: id, endDate: event.endDate, startDate: event.startDate, tags: event.tags, duration: event.getTime()};    
    this.storage.collection<IEvent>("events")
                .doc(id)
                .set(e)
                .then(res => {}, err => console.log(err));
  }

  public toggleEvent() {
    if (this.event.isRunning()) {
      this.event.stop();
      this.storeEvent(this.event);
      this.storage.collection("events").doc("currentEvent").delete();
    }else {
      this.startEvent();
    }
  }

  getTime() {
    return this.event.getTime();
  }

  public updateEvent(ie: Event) {
    const e: IEvent = { id: ie.id,
                        endDate: ie.endDate,
                        tags: ie.tags,
                        startDate: ie.startDate,
                        duration: ie.getTime()};

    this.storage.collection<IEvent>("events")
    .doc(e.id)
    .set(e)
    .then(res => {this.updateCurrentEvent();}, err => console.log(err));
  }

}
