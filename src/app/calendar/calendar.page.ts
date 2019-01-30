import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { ProjectService } from '../project/project.service';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      color: this.colors.yellow,
      start: new Date(),
    },
    {
      title: 'A non draggable event',
      color: this.colors.blue,
      start: new Date(2019, 1, 1)
    }
  ];

  refresh: Subject<any> = new Subject();

  projects: any;
  tasks: any;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response;
        //this.events = this.projects.map(project => );
      });
  }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //   event.start = newStart;
  //   event.end = newEnd;
  //   this.refresh.next();
  // }
}
