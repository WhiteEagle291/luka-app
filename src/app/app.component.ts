// app.component.ts

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Brod } from './models/brod';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/brod.reducer';
import { selectAllBrods } from './store/brod.selector'; // Ensure this path is correct
import { BrodService } from './services/brodovi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  brodovi$: Observable<Brod[]>; // Observable of array of Brods
  title: any;

  constructor(private store: Store<AppState>,private brodService: BrodService) {
    this.brodovi$ = this.store.pipe(select(selectAllBrods)); // Selecting all brods from store
  }

  ngOnInit() {
    this.brodService.fetchBrods().subscribe();
  }

  addBrod() {
    const newBrod: Brod = {
      id: 0, // This will be replaced with a proper integer ID in the service
      naziv: 'New Ship',
      vrsta: 'Cargo',
      posada: 10
    };
    this.brodService.addBrod(newBrod);
  }

  removeBrod(brodId: number) {
    this.brodService.removeBrod(brodId); // Dispatching removeBrod action
  }
}