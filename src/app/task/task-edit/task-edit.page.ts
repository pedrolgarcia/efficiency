import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.page.html',
  styleUrls: ['./task-edit.page.scss'],
})
export class TaskEditPage implements OnInit {

  editTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editTaskForm = this.formBuilder.group({
      nome: this.formBuilder.control(['']),
      categoria: this.formBuilder.control(['']),
      projeto: this.formBuilder.control(['']),
      inicio: this.formBuilder.control(['']),
      entrega: this.formBuilder.control(['']),
      descricao: this.formBuilder.control(['']),
    });
   }

  ngOnInit() {
  }

}
