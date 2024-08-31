import { Injectable } from '@angular/core';
import { Luka } from '../models/luka';
import { BehaviorSubject, Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';

@Injectable({                                        /*sa neta : We use the @Injectable decorator to make these */
providedIn: 'root'                                     /*services injectable throughout the application.*/
})
export class LukaService {
  removeLuka(lukaId: number) {
      throw new Error('Method not implemented.');
  }
  private luke: Luka[] = []; // niz luka                   
  private lukeSubject = new BehaviorSubject<Luka[]>([]);

  private apiUrl = 'http://localhost:3000/ports';

  constructor(private http: HttpClient) { }

  getPorts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPort(port: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, port);
  }

}
