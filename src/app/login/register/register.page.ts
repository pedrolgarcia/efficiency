import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: this.formBuilder.control(['']),
      email: this.formBuilder.control(['']),
      password: this.formBuilder.control(['']),
      passwordConfirmation: this.formBuilder.control(['']),
    })
  }

}
