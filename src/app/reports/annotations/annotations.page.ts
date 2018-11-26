import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.page.html',
  styleUrls: ['./annotations.page.scss'],
})
export class AnnotationsPage implements OnInit {

  annotationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.annotationForm = this.formBuilder.group({
      projeto: this.formBuilder.control(['']),
      tarefa: this.formBuilder.control(['']),
      anotacao: this.formBuilder.control([''])
    });
  }

}
