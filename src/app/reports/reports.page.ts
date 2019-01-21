import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  taskId: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
  }

  goToAnnotation() {
    this.router.navigate(['/annotations', this.taskId]);
  }

  goToTimeReport() {
    this.router.navigate(['/time-report', this.taskId]);
  }

  goToErrorReport() {
    this.router.navigate(['/error-report', this.taskId]);
  }

}
