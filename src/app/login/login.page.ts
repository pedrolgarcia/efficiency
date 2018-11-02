import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
    });
  }

  login(results): void {
    console.log(results);
  }

}
