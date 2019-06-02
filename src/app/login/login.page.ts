import { HomePage } from './../home/home.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../shared/alert/alert.service';
import { Regex } from '../regex';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private route: Router,
              private formBuilder: FormBuilder,
              private menuCtrl: MenuController,
              private authService: AuthService,
              private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);

    if (this.authService.isLogged) {
      this.route.navigate(['/']);
   }

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(new Regex().emailRegex)]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(response => {
      this.menuCtrl.enable(true);
      this.route.navigate(['/']);
    });
  }

}
