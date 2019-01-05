import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  header: string;
  subHeader: string;
  message: string;
  buttons: any[];

  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.header ? this.header : '',
      subHeader: this.subHeader ? this.subHeader : '',
      message: this.message ? this.message : '',
      buttons: this.buttons ? this.buttons : null
    });

    await alert.present();
  }
}
