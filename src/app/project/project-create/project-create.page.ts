import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Regex } from '../../regex';
import { ProjectService } from '../project.service';
import { AlertService } from '../../shared/alert/alert.service';
import { t } from '@angular/core/src/render3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.page.html',
  styleUrls: ['./project-create.page.scss'],
})
export class ProjectCreatePage implements OnInit {
  createProjectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private regex: Regex,
    private projectService: ProjectService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.pattern(new Regex().alphabeticRegex)]),
      inicio: this.formBuilder.control('', [Validators.required]),
      entrega: this.formBuilder.control('', [Validators.required]),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.projectService.createProject(this.createProjectForm.value)
      .subscribe(response => {
        this.alert.header = response.success;
        this.alert.message = response.message;
        this.alert.buttons = [{ text: 'Cadastrar tarefa', handler: () => this.router.navigate(['/task-create']) }];
        this.alert.presentAlert();
      });
  }

}
