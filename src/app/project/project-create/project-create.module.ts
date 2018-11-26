import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectCreatePage } from './project-create.page';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: ProjectCreatePage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ProjectCreatePage]
})
export class ProjectCreatePageModule {}
