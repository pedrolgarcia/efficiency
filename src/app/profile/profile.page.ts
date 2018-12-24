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

  constructor(private profileService: ProfileService) {
    this.profile = {
      id_usuario: 1,
      nome: 'Pedro',
      senha: '123456',
      email: 'teste@teste.com.br',
      avatar: 'src/assets/users/profile.png'
    };
    this.profileService.getUsers().subscribe(data => console.log(JSON.stringify(data)));
  }

  ngOnInit() {
  }

}
