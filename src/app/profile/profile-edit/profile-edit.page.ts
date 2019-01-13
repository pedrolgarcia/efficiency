import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alert/alert.service';
import { Regex } from '../../regex';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  editProfileForm: FormGroup;
  changePassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private regex: Regex
  ) { }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      name: this.formBuilder.control(this.authService.getUser().name, [Validators.pattern(new Regex().alphabeticRegex)]),
      changePassword: this.formBuilder.control(''),
      oldPassword: this.formBuilder.control('', [Validators.minLength(6)]),
      password: this.formBuilder.control('', [Validators.minLength(6)]),
      confirmPassword: this.formBuilder.control('', [Validators.minLength(6)])
    });
  }

  onSubmit(user): void {
    this.profileService.editUser(user).subscribe(response => {
      this.authService.setUser();

      this.alert.header = response.success;
      this.alert.message = response.message;
      this.alert.buttons = [{ text: 'OK', handler: () => this.router.navigate(['/profile']) }];
      this.alert.presentAlert();
    });
  }

  showPasswordFields(e) {
    this.changePassword = e.target.checked;
  }

}
