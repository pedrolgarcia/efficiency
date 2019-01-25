import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  saveAnnotation(taskId, data): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/annotations/${taskId}`, data);
  }

  getAnnotation(taskId): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/annotations/${taskId}`);
  }

  deleteAnnotation(taskId): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/annotations/${taskId}`);
  }

  saveTimeReport(taskId, data): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/time-reports/${taskId}`, data);
  }

  getTimeReport(taskId): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/time-reports/${taskId}`);
  }

  deleteTimeReport(taskId): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/time-reports/${taskId}`);
  }

  getErrorTypes(taskId): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/annotations/${taskId}`);
  }

}
