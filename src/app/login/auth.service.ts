import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BASE_URL } from '../app.api';
import { Observable } from 'rxjs';
import { Profile } from '../profile/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLogged(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${BASE_URL}/login`, credentials)
      .pipe(tap(data => {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
      }));
  }

  register(user): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/register`, user);
      // .pipe(tap(data => {

      // }));
  }

  logout(): void {
    this.http.get(`${BASE_URL}/logout`).subscribe(response => console.log(response));
  }

  getUser(): Profile {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
  }

  setUser(): any {
    this.http.get<any>(`${BASE_URL}/me`).toPromise()
      .then(data => {
        if (data.user) {
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
          return true;
        }
        return false;
      });
  }
}
