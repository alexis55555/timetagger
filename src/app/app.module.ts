import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../src/environments/environment';
import { EventComponent } from './components/event/event.component';
import { LoginComponent } from './components/login/login.component';
import { EventHistoryComponent } from './components/event-history/event-history.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TagsComponent } from './components/tags/tags.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    LoginComponent,
    EventHistoryComponent,
    TagsComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),    
    AngularFirestoreModule,

    // Material
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,  
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
