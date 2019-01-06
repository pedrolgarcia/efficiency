import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  project: Project;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.project = response;
      });
  }

  detailTask(id) {
    this.router.navigate([`/task/${id}`]);
  }

  finishProject(id) {
    console.log(id);
  }

  deleteProject(id) {
    console.log(id);
  }

}
