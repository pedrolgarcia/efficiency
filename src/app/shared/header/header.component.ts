import { Component, OnInit } from '@angular/core';
import { Profile } from '../../profile/profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile: Profile;
  user: any = JSON.parse(localStorage.getItem('user'));
  

  constructor() {
    console.log(this.user);
    this.profile = {
      id_usuario: this.user.id,
      nome: this.user.name,
      email: this.user.email,
      avatar: this.user.avatar
    };
  }

  ngOnInit() {
    console.log(this.profile);
  }

}
