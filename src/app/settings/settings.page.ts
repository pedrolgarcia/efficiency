import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { AlertService } from '../shared/alert/alert.service';
import { Router } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settingsForm: FormGroup;
  languages: any;
  themes: any;
  settings: Settings;

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private settingsService: SettingsService,
    private router: Router,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      linguagem: this.formBuilder.control('', [Validators.required]),
      dicas: this.formBuilder.control(''),
      tema: this.formBuilder.control('', [Validators.required])
    });
  }

  ionViewWillEnter() {
    this.settingsService.getLanguages().subscribe(response => this.languages = response);
    this.settingsService.getThemes().subscribe(response => this.themes = response);
    this.settings = this.settingsService.getSettingsFromStorage();

    this.settingsForm.setValue({
      'linguagem': this.settings.language_id,
      'tema': this.settings.theme_id,
      'dicas': this.settings.tips
    });
  }

  save() {
    this.settingsService.saveSettings(this.settingsForm.value)
      .subscribe(response => {
        this.settingsService.getSettings().subscribe(data => {
          localStorage.setItem('settings', JSON.stringify(data));
          this.languageService.setAppLanguage();
        });
        this.alert.header = response.success,
        this.alert.message = '';
        this.alert.buttons = [{
          text: 'OK',
          handler: () => this.router.navigate(['/'])
        }];
        this.alert.presentAlert();
      });
  }

}
