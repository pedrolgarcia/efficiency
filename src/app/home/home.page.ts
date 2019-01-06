import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project.model';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  projects: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(response => {
      this.projects = response;
    });
  }

}
