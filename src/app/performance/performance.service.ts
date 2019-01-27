import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(private http: HttpClient) { }

  getProjectsTasks(status = null): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/performance/projects-tasks/${status ? status : ''}`);
  }

  getErrors(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/performance/errors`);
  }

  getTasksByCategory(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/performance/tasks-category`);
  }
}
