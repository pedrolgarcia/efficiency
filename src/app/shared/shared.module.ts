import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    HeaderComponent,
    AlertComponent
  ],
  exports: [
    HeaderComponent,
    AlertComponent
  ]
})
export class SharedModule { }
