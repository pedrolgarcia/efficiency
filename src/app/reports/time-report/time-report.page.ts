import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report.service';
import { AlertService } from '../../shared/alert/alert.service';
import { Report } from '../report.model';

@Component({
  selector: 'app-time-report',
  templateUrl: './time-report.page.html',
  styleUrls: ['./time-report.page.scss'],
})
export class TimeReportPage implements OnInit {

  timeReportForm: FormGroup;
  timeReport: Report;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.timeReportForm = this.formBuilder.group({
      inicio: this.formBuilder.control('', [Validators.required]),
      fim: this.formBuilder.control('', [Validators.required]),
      interrupcoes: this.formBuilder.control('', [Validators.required]),
      comentario: this.formBuilder.control('', [Validators.required])
    });
  }

  ionViewWillEnter() {
    const taskId = this.route.snapshot.params['id'];
    this.reportService.getTimeReport(taskId)
      .subscribe(response => {
        this.timeReport = response;
        this.timeReportForm.setValue({
          inicio: this.timeReport.time_report.started_at,
          fim: this.timeReport.time_report.ended_at,
          interrupcoes: this.timeReport.time_report.interruptions,
          comentario: this.timeReport.time_report.comment
        });
      });
  }

  save() {
    this.reportService.saveTimeReport(this.route.snapshot.params['id'], this.timeReportForm.value)
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

  delete() {
    this.alert.header = 'Deseja mesmo excluir este relatório?';
    this.alert.message = 'Isso pode refletir na análise de seu desempenho!';

    this.alert.buttons = [{ text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
                          { text: 'Excluir', cssClass: 'danger', handler: () => {
                            this.reportService.deleteTimeReport(this.route.snapshot.params['id'])
                              .subscribe(response => {
                                this.alert.header = response.success;
                                this.alert.message = '';
                                this.alert.buttons = [{
                                  text: 'OK',
                                  handler: () => {
                                    this.timeReport = null;
                                    this.timeReportForm.setValue({
                                      inicio: '',
                                      fim: '',
                                      interrupcoes: '',
                                      comentario: ''
                                    });
                                    this.timeReportForm.markAsPristine();
                                    this.timeReportForm.markAsUntouched();
                                    this.router.navigate(['/task/', this.route.snapshot.params['id']]);
                                  }
                                }];
                                this.alert.presentAlert();
                              });
                          } }];
    this.alert.presentAlert();
  }

}
