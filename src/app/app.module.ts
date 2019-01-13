import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { Regex } from './regex';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    Regex
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
