import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl: string = 'https://localhost:7246/api/Booking/';

  constructor(private http: HttpClient, private router: Router) {}

  bulkBooking(bulkbookingObj: any) {
    return this.http.post<any>(`${this.baseUrl}bulkBooking`, bulkbookingObj);
  }

  quickBooking(quickbookingObj: any) {
    return this.http.post<any>(`${this.baseUrl}quickBooking`, quickbookingObj);
  }

  cancelBooking(cancelbookingObj: any) {
    console.log(cancelbookingObj);
    return this.http.post<any>(`${this.baseUrl}book`, cancelbookingObj);
  }
}
