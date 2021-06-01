import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Event } from '../models/event';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class EventService {
  event: Event = new Event();

  constructor(private firestore: AngularFirestore) {
   
  }

  public startEvent() {
    const event = new Event();
    this.firestore
            .collection("events")
            .add(event.json())
            .then(res => {}, err => console.log(err));
  }

  public storeEvent(event: Event) {
    this.firestore
            .collection("events")
            .add(event.json())
            .then(res => {}, err => console.log(err));
  }

  public toggleEvent() {
    if (this.event.isRunning()) {
      this.event.stop();
    }else {
      this.event.start();
    }
  }

  getTime() {
    return this.event.getTime();
  }
}
