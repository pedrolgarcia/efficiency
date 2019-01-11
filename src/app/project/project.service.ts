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

  filter(filter): Observable<Project> {
    return this.http.post<any>(`${BASE_URL}/projects/filter`, {filter});
  }

  editProject(id, data: Project): Observable<any> {
    return this.http.put<any>(`${BASE_URL}/projects/${id}`, {data});
  }

  finishProject(id): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/projects/${id}/finish`, {});
  }

  deleteProject(id): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/projects/${id}`);
  }

  backToProject(id): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/projects/${id}/back`, {});
  }

}
