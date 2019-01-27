import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report.service';
import { AlertService } from '../../shared/alert/alert.service';
import { ErrorType } from './error-type.model';
import { Report } from '../report.model';

@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.page.html',
  styleUrls: ['./error-report.page.scss'],
})
export class ErrorReportPage implements OnInit {

  errorReportForm: FormGroup[] = [];
  errorTypes: ErrorType;
  errors: Report;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private alert: AlertService
  ) { }

  ngOnInit() {

  }

  createForm() {
    this.errorReportForm.push(this.formBuilder.group({
      id: this.formBuilder.control(''),
      tipo: this.formBuilder.control('', [Validators.required]),
      tentativas: this.formBuilder.control('', [Validators.required]),
      ocorrencias: this.formBuilder.control('', [Validators.required]),
      descobrimento: this.formBuilder.control('', [Validators.required]),
      remocao: this.formBuilder.control('', [Validators.required]),
      descricao: this.formBuilder.control('', [Validators.required])
    }));
  }

  ionViewWillEnter() {
    this.createForm();
    this.errors = null;

    const taskId = this.route.snapshot.params['id'];
    this.reportService.getErrorTypes()
      .subscribe(response => this.errorTypes = response);

    this.reportService.getErrorReport(taskId)
      .subscribe(response => {
        this.errors = response;
        this.errorReportForm = [];
        response.error_report.errors.forEach((e, i) => {
          this.createForm();
          if (this.errorReportForm[i]) {
            this.errorReportForm[i].setValue({
              'id': e.id,
              'tipo': e.error_type_id,
              'tentativas': e.attempts_solve,
              'ocorrencias': e.occurrences,
              'descobrimento': e.discovery_at,
              'remocao': e.removed_at,
              'descricao': e.description
            });
          }
        });
      });

  }

  newError() {
    this.createForm();
  }

  save() {
    this.reportService.saveErrorReport(this.route.snapshot.params['id'], this.errorReportForm.map(report => report.value))
      .subscribe(response => {
        this.alert.header = response.success,
        this.alert.message = '';
        this.alert.buttons = [{
          text: 'OK',
          handler: () => this.router.navigate(['/task/', this.route.snapshot.params['id']])
        }];
        this.alert.presentAlert();
      });
  }

  delete(id) {
    this.alert.header = 'Deseja mesmo excluir esta anotação?';
    this.alert.message = 'Isso pode refletir na análise de seu desempenho!';

    this.alert.buttons = [{ text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
                          { text: 'Excluir', cssClass: 'danger', handler: () => {
                            this.reportService.deleteErrorReport(id)
                              .subscribe(response => {
                                this.alert.header = response.success;
                                this.alert.message = '';
                                this.alert.buttons = [{
                                  text: 'OK',
                                  handler: () => {
                                    this.errorReportForm = [];
                                    this.router.navigate(['/task/', this.route.snapshot.params['id']]);
                                  }
                                }];
                                this.alert.presentAlert();
                              });
                          } }];
    this.alert.presentAlert();
  }

}
