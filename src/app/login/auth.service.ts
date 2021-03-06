import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BASE_URL, BASE_BACKEND } from '../app.api';
import { Observable, of } from 'rxjs';
import { Profile } from '../profile/profile.model';
import { Router } from '@angular/router';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private settingsService: SettingsService) { }

  isLogged(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${BASE_URL}/login`, credentials)
      .pipe(tap(data => {
        if (data.user.avatar !== '/assets/users/profile.png') {
          data.user.avatar = `${BASE_BACKEND}${data.user.avatar}`;
        }
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('settings', JSON.stringify(data.settings));
      }));
  }

  register(user): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/register`, user);
  }

  logout(): void {
    this.http.get(`${BASE_URL}/logout`).subscribe(response => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/refresh`, {})
      .pipe(tap(data => {
        localStorage.setItem('token', data.access_token);
      }));
  }

  getUser(): Profile {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
  }

  setUser(): any {
    this.http.get<any>(`${BASE_URL}/user`).toPromise()
      .then(data => {
        if (data) {
          data.user.avatar = `${BASE_BACKEND}${data.user.avatar}`;
          console.log(data)
          localStorage.setItem('user', btoa(JSON.stringify(data)));
          return true;
        }
        return false;
      });
  }
}
