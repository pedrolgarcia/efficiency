import { Component, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';
import { BASE_BACKEND } from '../app.api';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: Profile;

  constructor(private profileService: ProfileService, private authService: AuthService) {
    // this.profileService.getUser().subscribe(response => {
    //   response.avatar = `${BASE_BACKEND}${response.avatar}`;
    //   this.profile = response;
    // });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.profileService.getUser().subscribe(response => {
      if (response.avatar !== '/assets/users/profile.png') {
        response.avatar = `${BASE_BACKEND}${response.avatar}`;
      }
      this.profile = response;
    });
  }

}
