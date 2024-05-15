import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7246/';
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
