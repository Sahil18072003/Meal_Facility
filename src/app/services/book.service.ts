import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl: string = 'https://localhost:7246/api/Booking/';
  constructor(private http: HttpClient, private router: Router) {}

  addBooking(bookingObj: any) {
    console.log(bookingObj);
    return this.http.post<any>(`${this.baseUrl}book`, bookingObj);
  }
}
