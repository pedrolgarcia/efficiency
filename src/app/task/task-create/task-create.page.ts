import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.page.html',
  styleUrls: ['./task-create.page.scss'],
})
export class TaskCreatePage implements OnInit {

  createTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createTaskForm = this.formBuilder.group({
      titulo: this.formBuilder.control(['']),
      projeto: this.formBuilder.control(['']),
      inicio: this.formBuilder.control(['']),
      entrega: this.formBuilder.control(['']),
      descricao: this.formBuilder.control(['']),
    })
  }

}
