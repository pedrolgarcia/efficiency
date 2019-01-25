import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../project/project.service';
import { TaskService } from '../../task/task.service';
import { Project } from '../../project/project.model';
import { Task } from '../../task/task.model';
import { ReportService } from '../report.service';
import { AlertService } from '../../shared/alert/alert.service';
import { Annotation } from './annotation.model';
import { Report } from '../report.model';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.page.html',
  styleUrls: ['./annotations.page.scss'],
})
export class AnnotationsPage implements OnInit {

  annotationForm: FormGroup;
  now = new Date().toISOString();
  taskLinked: boolean;
  projects: any;
  project: any;
  tasks: any;
  annotation: Report;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    private reportService: ReportService,
    private alert: AlertService
  ) { }

  ngOnInit() {

    this.annotationForm = this.formBuilder.group({
      projeto: this.formBuilder.control(''),
      tarefa: this.formBuilder.control(''),
      anotacao: this.formBuilder.control('', Validators.required),
      data: this.formBuilder.control(new Date().toISOString(), Validators.required),
    });
  }

  ionViewWillEnter() {
    const taskId = this.route.snapshot.params['id'];
    if (taskId) {
      this.reportService.getAnnotation(taskId)
        .subscribe(response => this.annotation = response);
    }

    this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response;
      });

    if (taskId) {
      this.taskLinked = true;
      this.taskService.getTask(taskId)
        .subscribe(response => {
          this.tasks = response;
          this.projectService.getProject(this.tasks.project_id)
            .subscribe(data => {
              this.project = data;
            });
        });

    } else {
      this.taskLinked = false;
    }
  }

  setTasksOptions(e) {
    this.annotationForm.controls['tarefa'].setValue('');
    if (this.projects) {
      this.tasks = this.projects.filter(project => project.id === e.target.value).map(tasks => tasks.tasks);
    }
  }

  reset() {
    this.annotationForm.controls['anotacao'].setValue('');
  }

  save() {
    this.reportService.saveAnnotation(this.route.snapshot.params['id'], this.annotationForm.value)
      .subscribe(response => {
        this.alert.header = response.success,
        this.alert.message = '';
        this.alert.buttons = [{
          text: 'OK',
          handler: () => this.router.navigate(['/task/', this.annotationForm.controls['tarefa'].value || this.route.snapshot.params['id']])
        }];
        this.alert.presentAlert();
      });
  }

  delete() {
    this.alert.header = 'Deseja mesmo excluir esta anotação?';
    this.alert.message = '';

    this.alert.buttons = [{ text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
                          { text: 'Excluir', cssClass: 'danger', handler: () => {
                            this.reportService.deleteAnnotation(this.route.snapshot.params['id'])
                              .subscribe(response => {
                                this.alert.header = response.success;
                                this.alert.message = '';
                                this.alert.buttons = [{
                                  text: 'OK',
                                  handler: () => {
                                    this.annotation = null;
                                    this.annotationForm.setValue({
                                      projeto: '',
                                      tarefa: '',
                                      anotacao: '',
                                      data: new Date().toISOString()
                                    });
                                    this.annotationForm.markAsPristine();
                                    this.annotationForm.markAsUntouched();
                                    this.router.navigate(['/task/', this.route.snapshot.params['id']]);
                                  }
                                }];
                                this.alert.presentAlert();
                              });
                          } }];
    this.alert.presentAlert();
  }

}
