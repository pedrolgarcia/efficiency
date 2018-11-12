import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  editProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      confirmPassword: this.formBuilder.control(''),
    });
  }

  editUser(results): void {
    console.log(results);
  }

}
