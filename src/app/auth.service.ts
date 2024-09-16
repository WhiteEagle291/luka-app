import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token');
    if (this.isValidToken(token)) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    this.loggedIn.next(!!token); 
  }



  private isValidToken(token: string | null): boolean {
    if (!token) return false;
  
    const expirationTime = localStorage.getItem('token_expiration');
    if (!expirationTime) return false;
  
    const currentTime = new Date().getTime(); 
    if (currentTime > +expirationTime) {
      this.logout(); 
      return false;
    }
  
    return true; 
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_expiration');
    this.loggedIn.next(false);
  }


  setLoginState(isLoggedIn: boolean): void {
    this.loggedIn.next(isLoggedIn);
  }
}
