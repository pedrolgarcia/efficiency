import { Injectable } from '@angular/core';
// import { HTTP } from '@ionic-native/http/ngx';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Profile } from './profile.model';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${BASE_URL}/profile`);
  }
}
