import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TimeTagger';  
  constructor(public authService: AuthService) {
  }

  ngAfterViewInit(): void {
    console.log("heir")
    console.log(this.authService.loggedInUser)
    
  }
  login() {
    this.authService.googleSignin();
  }

  logout() {
    this.authService.logout();
  }

  public getUser(): User {
    if (this.authService.loggedInUser) {
      return this.authService.loggedInUser;
    }
    return {displayName: "Login", email: "dummy", photoURL: "dummy", uid: "dummy"}
  }
}
