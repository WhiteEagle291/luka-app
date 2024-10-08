import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brod } from '../models/brod';

@Injectable({
  providedIn: 'root'
})
export class BrodService {

  private apiUrl = 'http://localhost:3000/ships'; 

  constructor(private http: HttpClient) {}


 
   updateBrod(brod: Brod): Observable<Brod> {
    return this.http.put<Brod>(`${this.apiUrl}/${brod.id}`, brod);
  }


  addUserToCrew(shipId: number, username: string): Observable<Brod> {
    return this.http.post<Brod>(`${this.apiUrl}/${shipId}/addUser`, { username });
  }


  fetchBrods(): Observable<Brod[]> {
    return this.http.get<Brod[]>(this.apiUrl);
  }

  addBrod(brod: Brod): Observable<Brod> {
    return this.http.post<Brod>(this.apiUrl, brod);
  }


    getShipsByPortId(portId: number): Observable<Brod[]> {
      return this.http.get<Brod[]>(`${this.apiUrl}?portId=${portId}`);
    }



  removeBrod(brodId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${brodId}`);
  }
}
