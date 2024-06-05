import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl: string = 'https://localhost:7246/api/Booking/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  bulkBooking(bulkbookingObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}bulkBooking`, bulkbookingObj);
  }

  quickBooking(quickbookingObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}quickBooking`, quickbookingObj);
  }

  viewUserBooking(): Observable<any> {
    const user = this.auth.getUser();
    if (!user) {
      throw new Error('User not found in localStorage');
    }
    const params = new HttpParams().set('userId', user.id);
    return this.http.get<any>(`${this.baseUrl}viewUserBookings`, { params });
  }

  cancelBooking(cancelBookingObj: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}cancelBooking`, cancelBookingObj);
  }
}
