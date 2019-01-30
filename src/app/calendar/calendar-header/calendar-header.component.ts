import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `
    <ion-row text-center>
      <ion-col size="2" text-right>
        <ion-icon name="arrow-back" style="color: #fff; font-size: 30px;"
          mwlCalendarPreviousView
          [view]="view"
          [(viewDate)]="viewDate"
          (viewDateChange)="viewDateChange.next(viewDate)">
        </ion-icon>
      </ion-col>
      <ion-col size="8" text-center>
        <h3 style="font-size: 20px; text-transform: capitalize;">{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>
      </ion-col>
      <ion-col size="2" text-left>
        <ion-icon name="arrow-forward" style="color: #fff; font-size: 30px;"
          mwlCalendarNextView
          [view]="view"
          [(viewDate)]="viewDate"
          (viewDateChange)="viewDateChange.next(viewDate)">
        </ion-icon>
      </ion-col>
    </ion-row>
    <br>
  `
})
export class CalendarHeaderComponent implements OnInit {
  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale: string = 'pt-BR';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor () { }

  ngOnInit() { }
}
