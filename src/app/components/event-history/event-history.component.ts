import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';



export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css']
})
export class EventHistoryComponent {
  selectedEvent: Event;
  @ViewChild('eventDetail') eventDetail: ElementRef;

  events: Event[] = [];
  displayedColumns: string[] = ['tags', 'duration', 'startDate'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public eventService: EventService) {
  }

  selectEvent(event: Event) {
    console.log("selected ", event);
    this.selectedEvent = event;
  }

  closeEventDetail() {
    this.selectedEvent = null;
  }


  ngAfterViewInit() {
    this.eventService.dataSource.paginator = this.paginator;
    this.eventService.dataSource.sort = this.sort;
  }

  applyFilter(event) {    
    const filterValue = (event.target as HTMLInputElement).value;
    this.eventService.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.eventService.dataSource.paginator) {
      this.eventService.dataSource.paginator.firstPage();
    }
  }

}
