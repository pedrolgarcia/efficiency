import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settingsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      idioma: this.formBuilder.control(['']),
      dicas: this.formBuilder.control(['']),
      cronograma: this.formBuilder.control([''])
    })
  }

}
