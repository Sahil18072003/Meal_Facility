import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private baseUrl: string = 'https://localhost:7246/api/Coupon/';

  constructor(private http: HttpClient) {}

  createCoupon(userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createCoupon`, { userId });
  }
}
