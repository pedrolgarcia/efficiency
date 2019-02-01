import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { ProjectService } from '../project/project.service';
import { TaskService } from '../task/task.service';
import { Content } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild(Content) content: Content;

  colors: any = {
    inProgress: {
      primary: '#50bf20',
      secondary: '#ccf2bc'
    },
    overdue: {
      primary: '#f21313',
      secondary: '#f2bfbf'
    },
    default: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    finished: {
      primary: '#fff200',
      secondary: '#f4f1ad'
    }
  };

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  // dateFilter: any = 2;

  projects: any;
  tasks: any = null;
  eventsDay: any[] = [];
  projectView: any[] = [];
  taskView: any[] = [];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.tasks = null;
    this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response;
        this.events = this.projects.map(project => {
          let color;
          if (project.status.id === 1 && !project.late) {
            color = this.colors.inProgress;
          }
          if (project.status.id === 2 && project.end) {
            color = this.colors.finished;
          }
          if (project.status.id === 1 && project.late) {
            color = this.colors.overdue;
          }

          return {
            title: `${project.name}`,
            color: color,
            // start: this.dateFilter === 1 ? new Date(project.started_at) : new Date(project.ended_at)
            start: new Date(project.ended_at)
          };
        });
      });
  }

  filterByProject() {
    this.tasks = null;
    this.ngOnInit();
  }

  filterByTask() {
    this.projects = null;
    this.taskService.getAllTasks()
      .subscribe(response => {
        this.tasks = response;
        this.events = this.tasks.map(task => {
          let color;
          if (task.status.id === 1 && !task.late) {
            color = this.colors.inProgress;
          }
          if (task.status.id === 2) {
            color = this.colors.finished;
          } 
          if (task.status.id === 1 && task.late) {
            color = this.colors.overdue;
          }

          return {
            title: `${task.name}`,
            color: color,
            // start: this.dateFilter === 1 ? new Date(task.started_at) : new Date(task.ended_at)
            start: new Date(task.ended_at)
          };
        });
      });
  }

  // onFilter(event) {
  //   this.dateFilter = event.target.value;
  // }

  dayClicked(day) {
    if (this.projects && !this.tasks) {
      this.projectView = [];
      this.eventsDay = day.day.events;
      this.eventsDay.forEach(element => {
        if (this.projects.filter(project => project.name === element.title).length > 0) {
          this.projectView.push(this.projects.filter(project => project.name === element.title));
        }
      });
    }

    if (this.tasks && !this.projects) {
      this.taskView = [];
      this.eventsDay = day.day.events;
      this.eventsDay.forEach(element => {
        if (this.tasks.filter(task => task.name === element.title).length > 0) {
          this.taskView.push(this.tasks.filter(task => task.name === element.title));
        }
      });
    }
    this.content.scrollToBottom(300);
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
