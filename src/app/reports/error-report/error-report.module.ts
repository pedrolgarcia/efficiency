import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ErrorReportPage } from './error-report.page';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: ErrorReportPage }
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
  declarations: [ErrorReportPage]
})
export class ErrorReportPageModule {}
