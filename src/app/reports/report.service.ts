import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  saveAnnotation(id, data): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/annotations/${id}`, data);
  }
}
