import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl: string = 'https://localhost:7246/api/Notification/';

  constructor(private http: HttpClient) {}

  getNotifications(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}GetNotifications`, {
      params: { email },
    });
  }
}
