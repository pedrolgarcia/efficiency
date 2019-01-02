import { Component, OnInit } from '@angular/core';
import { Profile } from '../../profile/profile.model';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile: Profile;
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();

    this.profile = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      avatar: this.user.avatar
    };
  }

  ngOnInit() {
    console.log(this.profile);
  }

}
