import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.api';
import { Settings } from './settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/languages`);
  }

  getThemes(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/themes`);
  }

  getSettings(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/settings`);
  }

  getSettingsFromStorage(): Settings {
    return localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : null;
  }

  saveSettings(settings): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/settings`, settings);
  }
}
