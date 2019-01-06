import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './login/register/register.module#RegisterPageModule' },
  { path: 'forgot', loadChildren: './login/forgot/forgot.module#ForgotPageModule' },
  { path: '' , canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', loadChildren: './home/home.module#HomePageModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
      { path: 'profile-edit', loadChildren: './profile/profile-edit/profile-edit.module#ProfileEditPageModule' },
      { path: 'project/:id', loadChildren: './project/project.module#ProjectPageModule' },
      { path: 'project-create', loadChildren: './project/project-create/project-create.module#ProjectCreatePageModule' },
      { path: 'project-edit/:id', loadChildren: './project/project-edit/project-edit.module#ProjectEditPageModule' },
      { path: 'task/:id', loadChildren: './task/task.module#TaskPageModule' },
      { path: 'task-create', loadChildren: './task/task-create/task-create.module#TaskCreatePageModule' },
      { path: 'task-edit/:id', loadChildren: './task/task-edit/task-edit.module#TaskEditPageModule' },
      { path: 'reports', loadChildren: './reports/reports.module#ReportsPageModule' },
      { path: 'annotations', loadChildren: './reports/annotations/annotations.module#AnnotationsPageModule' },
      { path: 'timer', loadChildren: './timer/timer.module#TimerPageModule' },
      { path: 'time-report', loadChildren: './reports/time-report/time-report.module#TimeReportPageModule' },
      { path: 'error-report', loadChildren: './reports/error-report/error-report.module#ErrorReportPageModule' },
      { path: 'performance', loadChildren: './performance/performance.module#PerformancePageModule' },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
    ] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
