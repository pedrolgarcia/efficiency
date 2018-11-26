import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.page.html',
  styleUrls: ['./performance.page.scss'],
})
export class PerformancePage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };

  constructor(public loadingController: LoadingController) {
    this.presentLoading();
  }

  ngOnInit() {
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
