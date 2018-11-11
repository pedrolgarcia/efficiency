import { HomePage } from './../home/home.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private route: NavController, private formBuilder: FormBuilder, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      //user: this.formBuilder.control('', [Validators.required]),
      //password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
      user: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
    });
  }

  login(results): void {
    this.menuCtrl.enable(true);
    this.route.navigateRoot(['home']);
  }

}
