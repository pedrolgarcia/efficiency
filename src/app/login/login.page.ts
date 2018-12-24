import { HomePage } from './../home/home.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogged: boolean = false;
  loginForm: FormGroup;

  constructor(private route: Router, private formBuilder: FormBuilder, private menuCtrl: MenuController, private authService: AuthService) {
    this.menuCtrl.enable(false);
    if(this.isLogged) {
      this.route.navigate(['home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(response => {
      this.menuCtrl.enable(true);
      this.route.navigate(['home'])
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse);
    });
  }

}
