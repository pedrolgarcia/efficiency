import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../project.model';
import { AlertService } from '../../shared/alert/alert.service';
import { Regex } from '../../regex';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {

  editProjectForm: FormGroup;
  project: Project;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router,
    private regex: Regex
  ) {
    this.editProjectForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.pattern(this.regex.alphabeticRegex)]),
      inicio: this.formBuilder.control('', [Validators.required]),
      entrega: this.formBuilder.control('', [Validators.required]),
      descricao: this.formBuilder.control('', [Validators.required])
    });

    this.projectService.getProject(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.project = response;
        this.editProjectForm.setValue({
          nome: this.project.name,
          inicio: this.project.started_at,
          entrega: this.project.ended_at,
          descricao: this.project.description
        });
      });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.projectService.editProject(this.route.snapshot.params['id'], this.editProjectForm.value)
      .subscribe(response => {
        this.alert.header = response.success;
        this.alert.message = response.message;
        this.alert.buttons = [{ text: 'OK', handler: () => this.router.navigate([`/project/${this.route.snapshot.params['id']}`]) }];
        this.alert.presentAlert();
      });
  }

}
