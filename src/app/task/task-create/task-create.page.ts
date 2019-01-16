import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Regex } from '../../regex';
import { ProjectService } from '../../project/project.service';
import { TaskService } from '../task.service';
import { Project } from '../../project/project.model';
import { Category } from '../category';
import { AlertService } from '../../shared/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.page.html',
  styleUrls: ['./task-create.page.scss'],
})
export class TaskCreatePage implements OnInit {

  createTaskForm: FormGroup;
  projects: Project;
  categories: Category;

  constructor(
    private formBuilder: FormBuilder,
    private regex: Regex,
    private projectService: ProjectService,
    private taskService: TaskService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createTaskForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.pattern(this.regex.alphabeticRegex)]),
      categoria: this.formBuilder.control('', [Validators.required]),
      projeto: this.formBuilder.control('', [Validators.required]),
      inicio: this.formBuilder.control('', [Validators.required]),
      entrega: this.formBuilder.control('', [Validators.required]),
      descricao: this.formBuilder.control('', [Validators.required]),
    });
  }

  ionViewWillEnter() {
    this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response;
      });

    this.taskService.getCategories()
      .subscribe(response => {
        this.categories = response;
      });
  }

  onSubmit() {
    this.taskService.createTask(this.createTaskForm.value)
      .subscribe(response => {
        this.alert.header = response.success;
        this.alert.message = response.message;
        this.alert.buttons = [{
                                text: 'OK',
                                handler: () => this.router.navigate([`/project/${this.createTaskForm.get('projeto').value}`]) 
                              }];
        this.alert.presentAlert();
      });
  }

}
