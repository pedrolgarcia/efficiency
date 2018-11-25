import { Component, OnInit } from '@angular/core';
import { Profile } from '../../profile/profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile: Profile;

  constructor() {
    this.profile = {
      id_usuario: 1,
      nome: 'Pedro',
      senha: '123456',
      email: 'teste@teste.com.br',
      avatar: 'src/assets/users/profile.png'
    };
  }

  ngOnInit() {
    console.log(this.profile); 
  }

}
