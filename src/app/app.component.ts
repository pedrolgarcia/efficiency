import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    { title: 'Meu feed', url: '/home', icon: 'home' },
    { title: 'Cadastrar Projeto', url: '/project-create', icon: 'add-circle' },
    { title: 'Cadastrar Tarefa', url: '/task', icon: 'add-circle' },
    { title: 'Editar Usuário', url: '/profile-edit', icon: 'person' },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
