import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project.model';
import { BASE_URL } from '../app.api';
import { Task } from '../task/task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project> {
    return this.http.get<any>(`${BASE_URL}/projects`);
  }

  getProject(id): Observable<Project> {
    return this.http.get<any>(`${BASE_URL}/projects/${id}`);
  }

}
