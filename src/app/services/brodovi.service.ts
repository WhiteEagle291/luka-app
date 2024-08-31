import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brod } from '../models/brod';

@Injectable({
  providedIn: 'root'
})
export class BrodService {

  private apiUrl = 'http://localhost:3000/ships'; // Adjust URL to your API endpoint

  constructor(private http: HttpClient) {}

  fetchBrods(): Observable<Brod[]> {
    return this.http.get<Brod[]>(this.apiUrl);
  }

  addBrod(brod: Brod): Observable<Brod> {
    return this.http.post<Brod>(this.apiUrl, brod);
  }

  // getShips(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // addShip(ship: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, ship);
  // }

  removeBrod(brodId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${brodId}`);
  }
}
