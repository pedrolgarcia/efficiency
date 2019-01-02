import { Component, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: Profile;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getUser().subscribe(response => {
      this.profile = new Profile(
        response.id,
        response.name,
        response.email,
        response.email_verified_at,
        null,
        response.avatar,
        response.created_at,
        response.updated_at
      );
    });
    console.log(this.profile);
  }

}
