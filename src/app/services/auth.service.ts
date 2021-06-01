import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Event } from '../models/event';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  loggedInUser: User;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth, private eventService: EventService) { 
    this.autoLogin();
  }

  autoLogin() {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
     switchMap(user => {
         // Logged in
       if (user) {
         this.loggedInUser = user;
         this.eventService.init(this.loggedInUser);

         //this.router.navigate(['/start']);
         return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
       } else {
         // Logged out
         this.loggedInUser = null;
         //kakathis.router.navigate(['/login']);
         return of(null);
       }
     })
   );
}


public getUser(uid: string): Observable<User>{
  return this.firestore.doc<User>(`users/${uid}`).valueChanges();
}

async googleSignin() {
  const provider = new firebase.default.auth.GoogleAuthProvider()
  const credential = await this.afAuth.signInWithPopup(provider);  
  return this.updateUserData(credential.user);
}

private updateUserData(u) {
  // Sets user data to firestore on login
  const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${u.uid}`);

  const user: User = {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName,
    photoURL: u.photoURL
  };
  this.loggedInUser = user;
  console.log(this.loggedInUser)
  this.eventService.init(this.loggedInUser);

  //this.router.navigate(['/start']);
  return userRef.set(user, { merge: true });

}

async logout() {
  await this.afAuth.signOut();
  //kakathis.router.navigate(['/login']);
}
}
