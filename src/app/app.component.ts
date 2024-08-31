import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.state'; // Update this path if necessary
import { selectAllBrods } from './store/brod.selector';
import { Brod } from './models/brod';
import * as BrodActions from './store/brod.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  luka = {
    id: 1,
    name: 'Main Port',
    capacity: 10,
    ships: [] as Brod[]
  };

  brodovi$: Observable<Brod[]>; // Observable of array of Brods

  constructor(private store: Store<AppState>) {
    this.brodovi$ = this.store.pipe(select(selectAllBrods)); // Selecting all brods from store
  }

  ngOnInit() {
    // Dispatch an action to load ships from the store
    this.store.dispatch(BrodActions.loadBrods());
  }

  addShipToPort(brod: Brod) {
    if (this.luka.ships.length < this.luka.capacity) {
      // Add ship to the port (local state) if the port's capacity is not reached
      this.luka.ships.push(brod);
    } else {
      alert('Port capacity reached! Cannot add more ships.');
    }
  }

  selectShip(brod: Brod) {
    console.log('Selected Ship:', brod);
  }

  removeShipFromPort(brod: Brod) {
    const index = this.luka.ships.findIndex(b => b.id === brod.id);
    if (index !== -1) {
      // Remove ship from the port (local state)
      this.luka.ships.splice(index, 1);
    }
  }
}
