import { HomePage } from './../home/home.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // isLogged: boolean = false;
  loginForm: FormGroup;

  constructor(private route: Router,
              private formBuilder: FormBuilder,
              private menuCtrl: MenuController,
              private authService: AuthService,
              private alertService: AlertService) {
    this.menuCtrl.enable(false); 
  }

  ngOnInit() {
    if (this.authService.isLogged) {
      this.route.navigate(['home']);
   }

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(response => {
      this.menuCtrl.enable(true);
      this.route.navigate(['home']);
    }, (errorResponse: HttpErrorResponse) => {
      this.alertService.header = 'Falha na autenticação';
      this.alertService.message = errorResponse.error.error;
      this.alertService.buttons = ['OK'];
      this.alertService.presentAlert();
      console.log(errorResponse);
    });
  }

}
