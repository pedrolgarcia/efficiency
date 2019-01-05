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

  constructor(private authService: AuthService) {
    this.profile = this.authService.getUser();
  }

  ngOnInit() {
  }

}
