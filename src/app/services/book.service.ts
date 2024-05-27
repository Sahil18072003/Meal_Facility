import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl: string = 'https://localhost:7246/api/Booking/';
  
  constructor(private http: HttpClient, private router: Router) {}

  addBooking(bulkbookingObj: any) {
    console.log(bulkbookingObj);
    return this.http.post<any>(`${this.baseUrl}book`, bulkbookingObj);
  }

  quickBooking(quickbookingObj: any) {
    console.log(quickbookingObj);
    return this.http.post<any>(`${this.baseUrl}book`, quickbookingObj);
  }

  cancelBooking(cancelbookingObj: any) {
    console.log(cancelbookingObj);
    return this.http.post<any>(`${this.baseUrl}book`, cancelbookingObj);
  }
}
