import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomePageModule } from './home/home.module';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './shared/interceptors/refresh-token.interceptor';
import { ErrorHandlerService } from './error-handler.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Regex } from './regex';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';


JSON.parse(localStorage.getItem('settings')) && JSON.parse(localStorage.getItem('settings')).language_id === 1 ?
  registerLocaleData(localePt, 'pt-BR') : registerLocaleData(localeEn, 'en');
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HomePageModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    JSON.parse(localStorage.getItem('settings')) && JSON.parse(localStorage.getItem('settings')).language_id === 1 ?
      { provide: LOCALE_ID, useValue: 'pt-BR' } :
      { provide: LOCALE_ID, useValue: 'en_us' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    Regex,
    Camera,
    File,
    FileTransfer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
