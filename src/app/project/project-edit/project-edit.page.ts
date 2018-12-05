import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {

  editProjectForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editProjectForm = this.formBuilder.group({
      nome: this.formBuilder.control(''),
      // subtitulo: this.formBuilder.control(''),
      // especialidade: this.formBuilder.control(''),
      inicio: this.formBuilder.control(''),
      entrega: this.formBuilder.control(''),
      descricao: this.formBuilder.control('')
    });
   }

  ngOnInit() {
  }

}
