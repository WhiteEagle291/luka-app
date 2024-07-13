import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Brod } from '../models/brod';
import { addBrod, removeBrod } from '../store/brod.action';
import { AppState } from '../store/brod.reducer';
import { HttpClient } from '@angular/common/http';
import { map, merge, Observable, switchMap, take, takeUntil, zip } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrodService {

  private baseUrl = 'http://localhost:3000/brodovi';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  fetchBrods(): Observable<Brod[]> {
    return this.http.get<Brod[]>(this.baseUrl).pipe(
      map(brods => brods.filter(brod => brod.posada > 10)), // Example of using filter
      map(brods => brods.map(brod => ({ ...brod, naziv: brod.naziv.toUpperCase() }))) // Example of using map
    );
  }

  addBrod(brod: Brod) {
    this.http.get<Brod[]>(this.baseUrl).pipe(
      map(brods => Math.max(...brods.map(b => b.id), 0) + 1), // Generate the next integer ID
      switchMap(newId => {
        const newBrodWithId = { ...brod, id: newId };
        return this.http.post<Brod>(this.baseUrl, newBrodWithId).pipe(
          switchMap(() => this.fetchBrods()),
          take(1)
        );
      })
    ).subscribe(brods => {
      this.store.dispatch(addBrod({ brod }));
    });
  }

  removeBrod(brodId: number) {
    console.log(`Deleting brod with ID: ${brodId}`);
    this.http.delete(`${this.baseUrl}/${brodId}`).subscribe(() => {
      console.log(`Deleted brod with ID: ${brodId}`);
      this.store.dispatch(removeBrod({ brodId }));
    }, error => {
      console.error(`Error deleting brod with ID: ${brodId}`, error);
    });
  
  
  }

  // combineOperations() {
  //   const brods$ = this.fetchBrods();
  //   const additionalData$ = this.http.get<any[]>('http://localhost:3000/additionalData');

  //   zip(brods$, additionalData$).pipe(
  //     merge()
  //   ).subscribe(([brods, additionalData]) => {
  //     // Process combined data
  //     console.log(brods, additionalData);
  //   });
  //}
}