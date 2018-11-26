import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnnotationsPage } from './annotations.page';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: AnnotationsPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnnotationsPage]
})
export class AnnotationsPageModule {}
