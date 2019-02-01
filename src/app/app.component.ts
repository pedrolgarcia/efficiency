import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './login/auth.service';
import { SettingsService } from './settings/settings.service';
import { Settings } from './settings/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [
    `ion-content { --ion-background-color: #111D12 !important; }`
  ]
})
export class AppComponent {
  public appPages = [
    { title: 'Meu feed', url: '/', icon: 'home' },
    { title: 'Cadastrar Projeto', url: '/project-create', icon: 'clipboard' },
    { title: 'Cadastrar Tarefa', url: '/task-create', icon: 'filing' },
    { title: 'Calendário', url: '/calendar', icon: 'calendar' },
    { title: 'Desempenho', url: '/performance', icon: 'stats' },
    { title: 'Cronômetro', url: '/timer', icon: 'time' },
    { title: 'Anotações', url: '/annotations', icon: 'bookmarks' },
    { title: 'Editar Usuário', url: '/profile-edit', icon: 'person' },
    { title: 'Configurações', url: '/settings', icon: 'settings' },
    { title: 'Sair', url: '/login', icon: 'log-out' },
  ];

  settings: Settings;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.settings = this.settingsService.getSettingsFromStorage();
  }

  logout() {
    this.authService.logout();
  }
}
