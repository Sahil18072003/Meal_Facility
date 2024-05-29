import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl: string = 'https://localhost:7246/api/Coupon/';
  
  constructor(private http: HttpClient, private router: Router) {}

  coupon(couponObj: any) {
    console.log(couponObj);
    return this.http.post<any>(`${this.baseUrl}coupon`, couponObj);
  }
}
