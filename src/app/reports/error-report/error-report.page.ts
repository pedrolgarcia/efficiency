import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.page.html',
  styleUrls: ['./error-report.page.scss'],
})
export class ErrorReportPage implements OnInit {

  errorReportForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.errorReportForm = this.formBuilder.group({
      tipo: this.formBuilder.control(['']),
      tentativas: this.formBuilder.control(['']),
      ocorrencias: this.formBuilder.control(['']),
      descobrimento: this.formBuilder.control(['']),
      remocao: this.formBuilder.control(['']),
      descricao: this.formBuilder.control([''])
    });
  }

}
