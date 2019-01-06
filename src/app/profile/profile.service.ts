import { Injectable } from '@angular/core';
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

  getUser(): Observable<Profile> {
    return this.http.get<any>(`${BASE_URL}/me`);
  }

  editUser(user): Observable<any> {
    return this.http.put(`${BASE_URL}/me`, user);
  }
}
