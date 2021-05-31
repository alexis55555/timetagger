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


  user$: Observable<User>;
  loggedInUser: User;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
   
  }

  login() {
         // Get the auth state, then fetch the Firestore user document or return null
         this.user$ = this.afAuth.authState.pipe(
          switchMap(user => {
              // Logged in
            if (user) {
              this.loggedInUser = user;
              const test: AngularFirestoreDocument<Event> = this.firestore.doc('orders/' + this.loggedInUser.uid);
              test.valueChanges().subscribe(o => {
                if (o !== undefined) {
                  console.log(o)
                }
               });
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

  public store() {
    const event = new Event();
    this.firestore
            .collection("events")
            .add(event.json())
            .then(res => {}, err => console.log(err));
  }


  public getUser(uid: string): Observable<User>{
    return this.firestore.doc<User>(`users/${uid}`).valueChanges();
  }

  async googleSignin() {
    const provider = new firebase.default.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log(credential.user);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    //this.router.navigate(['/start']);
    return userRef.set(data, { merge: true });

  }

  async logout() {
    await this.afAuth.signOut();
    //kakathis.router.navigate(['/login']);
  }
}
