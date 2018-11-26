import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimeReportPage } from './time-report.page';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: TimeReportPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimeReportPage]
})
export class TimeReportPageModule {}
