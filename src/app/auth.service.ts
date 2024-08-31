import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // or other relevant endpoint
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    // Initialize login state based on token presence or other logic
    const token = localStorage.getItem('access_token');
    this.loggedIn.next(!!token); // Convert token existence to boolean
  }

  // Modify methods to work with your actual endpoints
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }

  // Remove or update this method as it is related to a non-existent /protected route
  getProtectedData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/some-existing-endpoint`, { headers });
  }

  setLoginState(isLoggedIn: boolean): void {
    this.loggedIn.next(isLoggedIn);
  }
}
