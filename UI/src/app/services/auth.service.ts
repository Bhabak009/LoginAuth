import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Login } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private baseUrl = 'https://localhost:7125/api/auth';
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient,private router:Router) { }

  login(credentials: { userName: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { withCredentials: true }).pipe(tap(res=>{
      if(res.message === 'Login successful'){
        this.router.navigate(['/state']);
      }
    }));
  }
  // isLoggedIn(): boolean {
  //   return document.cookie.split(';').some((item) => item.trim().startsWith('JWT='));
  // }
  getTokenFromCookies(): string | null {
    debugger;
    const name ='JWT=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  // isAuthenticated(): boolean {
  //   debugger;
  //   return this.getTokenFromCookies() !== null;
  // }
  isAuthenticated(): boolean {
    // Use an appropriate method to check authentication status
    return !!this.getAuthToken();
  }
  checkSession(): Observable<any> {
    return this.http.get(`${this.baseUrl}/check-session`, { withCredentials: true });
  }
  getAuthToken(): string | null {
    
    const name = 'JWT=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
}
