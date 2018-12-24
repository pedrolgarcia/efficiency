import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BASE_URL } from '../app.api';
import { Observable } from 'rxjs';

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
        localStorage.setItem('user', JSON.stringify(data.user));
      }));
  }
}
