import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import { BASE_URL } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<any>(`${BASE_URL}/tasks`);
  }

  getTask(id): Observable<Task> {
    return this.http.get<any>(`${BASE_URL}/tasks/${id}`);
  }

  editTask(id, data: Task): Observable<any> {
    return this.http.put<any>(`${BASE_URL}/tasks/${id}`, { data });
  }

  createTask(data): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/tasks`, { data });
  }

  finishTask(id): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/tasks/${id}/finish`, {});
  }

  deleteTask(id): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/tasks/${id}`);
  }

  backToTask(id): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/tasks/${id}/back`, {});
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/categories`);
  }

  setTime(id, data): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/tasks/${id}/timer`, data);
  }
}

