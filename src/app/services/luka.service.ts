import { Injectable } from '@angular/core';
import { Luka } from '../models/luka';
import { BehaviorSubject } from 'rxjs';

@Injectable({                                        /*sa neta : We use the @Injectable decorator to make these */
providedIn: 'root'                                     /*services injectable throughout the application.*/
})
export class LukaService {
  private luke: Luka[] = []; // niz luka                   
  private lukeSubject = new BehaviorSubject<Luka[]>([]);

  constructor() { }

  getPorts() {
    return this.lukeSubject.asObservable();
  }

  addPort(luka: Luka) {
    this.luke.push(luka);
    this.lukeSubject.next([...this.luke]);
  }

  removePort(lukaId: number) {
    this.luke = this.luke.filter(luka => luka.id !== lukaId);
    this.lukeSubject.next([...this.luke]);
  }
}
