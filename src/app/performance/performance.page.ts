import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PerformanceService } from './performance.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.page.html',
  styleUrls: ['./performance.page.scss'],
})
export class PerformancePage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };
  createdProjectsTasks: any;
  completedProjectsTasks: any;
  overdueProjectsTasks: any;
  errors: any;
  tasksByCategory: any;

  constructor(
    public loadingController: LoadingController,
    private performanceService: PerformanceService
  ) {
    this.presentLoading();
  }

  ngOnInit() {
      this.performanceService.getProjectsTasks().subscribe(response => this.createdProjectsTasks = response);
      this.performanceService.getProjectsTasks(2).subscribe(response => this.completedProjectsTasks = response);
      this.performanceService.getProjectsTasks(3).subscribe(response => this.overdueProjectsTasks = response);
      this.performanceService.getErrors().subscribe(response => this.errors = response);
      this.performanceService.getTasksByCategory().subscribe(response => this.tasksByCategory = response);
  }

  ionViewWillEnter() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Analisando Desempenho...',
      duration: 3000,
      translucent: true,
      cssClass: 'custom-loading'
    });
    return await loading.present();
  }

}
