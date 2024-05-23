import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7246/api/User/';
  constructor(private http: HttpClient, private router: Router) {}

  signUp(userObj: any) {
    console.log(userObj);
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  forgotPassword(forgotObj: any) {
    return this.http.post<any>(`${this.baseUrl}forgotPassword`, forgotObj);
  }

  otpverification(otpObj: any) {
    return this.http.post<any>(`${this.baseUrl}otp`, otpObj);
  }

  resetPassword(resetObj: any) {
    return this.http.post<any>(`${this.baseUrl}resetPassword`, resetObj);
  }

  changePassword(changeObj: any) {
    return this.http.post<any>(`${this.baseUrl}changePassword`, changeObj);
  }

  storeName(nameValue: string) {
    localStorage.setItem('name', nameValue);
    console.log(nameValue);
  }

  getName() {
    return localStorage.getItem('name');
  }

  storeTokan(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isloggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
