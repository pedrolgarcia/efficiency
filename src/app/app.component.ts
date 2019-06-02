import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './login/auth.service';
import { SettingsService } from './settings/settings.service';
import { Settings } from './settings/settings.model';
import { Router, NavigationEnd } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';
import { BASE_BACKEND } from './app.api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'feed.title', url: '/', icon: 'home' },
    { title: 'create_project.title', url: '/project-create', icon: 'clipboard' },
    { title: 'create_task.title', url: '/task-create', icon: 'filing' },
    { title: 'calendar.title', url: '/calendar', icon: 'calendar' },
    { title: 'performance.title', url: '/performance', icon: 'stats' },
    { title: 'timer.title', url: '/timer', icon: 'time' },
    { title: 'annotation.title', url: '/annotations', icon: 'bookmarks' },
    { title: 'edit_user.title', url: '/profile-edit', icon: 'person' },
    { title: 'settings.title', url: '/settings', icon: 'settings' },
    { title: 'logout.title', url: '/login', icon: 'log-out' },
  ];

  settings: Settings;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router,
    private localNotifications: LocalNotifications,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {
    this.initializeApp();

    if (this.platform.is('android')) {
      this.statusBar.backgroundColorByHexString('#3880ff');
    }

    // Schedule delayed notification
    this.localNotifications.schedule({
      id: 1,
      title: 'Dicas',
      text: 'Dicas',
      trigger: {at: new Date(new Date().getTime() + 1)},
      icon: `${BASE_BACKEND}/image/icons/tips.png`,
      smallIcon: `${BASE_BACKEND}/image/logo.png`,
      data: { secret: 'Local Notification' }
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.languageService.setAppLanguage();
    });


  }

  ngOnInit() {
    this.router.events.subscribe(
      (event) => {
             if (event instanceof NavigationEnd) {
              this.settings = this.settingsService.getSettingsFromStorage();
             }
      });

    this.settings = this.settingsService.getSettingsFromStorage();
  }

  logout() {
    this.authService.logout();
  }
}
