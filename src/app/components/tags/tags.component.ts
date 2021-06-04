import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{
  @Input() event: Event;
  

  constructor(public eventService: EventService) {
  }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase().trim();
    const tags = Array.from(this.eventService.tags.values());
    console.log(tags)
    return tags.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  add(tag: string) {
    this.event.addTag(tag)
    this.eventService.updateEvent(this.event);   
    this.myControl.setValue('');
  }

  remove(i) {
    this.event.removeTag(i);
    this.eventService.updateEvent(this.event);
  }

  getFilteredOptions() {
    return ["asd"]
  }

}
