import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {
  tasks: Number[] = [1, 2, 3];

  constructor(private route: Router) { }

  ngOnInit() {
  }

  detailTask() {
    this.route.navigate(['task']);
  }

}
