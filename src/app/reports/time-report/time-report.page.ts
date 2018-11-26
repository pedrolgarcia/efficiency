import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-time-report',
  templateUrl: './time-report.page.html',
  styleUrls: ['./time-report.page.scss'],
})
export class TimeReportPage implements OnInit {

  timeReportForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.timeReportForm = this.formBuilder.group({
      inicio: this.formBuilder.control(['']),
      fim: this.formBuilder.control(['']),
      interrupcoes: this.formBuilder.control(['']),
      comentario: this.formBuilder.control([''])
    });
  }

}
