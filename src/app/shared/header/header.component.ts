import { Component, OnInit } from '@angular/core';
import { Profile } from '../../profile/profile.model';
import { AuthService } from '../../login/auth.service';
import { SettingsService } from '../../settings/settings.service';
import { Settings } from '../../settings/settings.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile: Profile;
  settings: Settings;

  constructor(private authService: AuthService, private settingsService: SettingsService) {
    this.profile = this.authService.getUser();
  }

  ngOnInit() {
    this.settings = this.settingsService.getSettingsFromStorage();
  }

}
