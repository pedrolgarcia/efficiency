import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.page.html',
  styleUrls: ['./project-create.page.scss'],
})
export class ProjectCreatePage implements OnInit {
  createProjectForm: FormGroup;
  today: Date = new Date();

  constructor(private formBuilder: FormBuilder) {
    this.createProjectForm = this.formBuilder.group({
      titulo: this.formBuilder.control(''),
      subtitulo: this.formBuilder.control(''),
      especialidade: this.formBuilder.control(''),
      inicio: this.formBuilder.control(''),
      entrega: this.formBuilder.control(''),
      descricao: this.formBuilder.control('')
    });
   }

  ngOnInit() {
  }

}
