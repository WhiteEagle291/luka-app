// luka.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Brod } from '../../models/brod';
import { AppState } from 'src/app/app.state'; // Updated import path
import * as BrodActions from '../../store/brod.action';
import { Luka } from '../../models/luka';

@Component({
  selector: 'app-luka',
  templateUrl: './luka.component.html',
  styleUrls: ['./luka.component.scss']
})
export class LukaComponent implements OnInit {
  @Input() luka: Luka | undefined;
  brodovi$: Observable<Brod[]>;
  shipForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.shipForm = this.fb.group({
      name: '',
      type: 'Warship',
      crew: ''
    });
    this.brodovi$ = this.store.select(state => state.brodovi);
  }

  ngOnInit(): void {
    this.store.dispatch(BrodActions.loadBrods());
    this.shipForm = this.fb.group({
      naziv: ['', Validators.required],
      vrsta: ['Warship'],
      posada: ['']
    });
  }

  addShip() {
    const newShip: Brod = {
      id: 0,
      name: this.shipForm.value.naziv,
      type: this.shipForm.value.vrsta,
      crew: [this.shipForm.value.posada]
    };

    console.log('Submitting ship:', newShip); // Add this line to debug
    this.store.dispatch(BrodActions.addBrod({ brod: newShip }));
    this.shipForm.reset({ type: 'Warship', crew: '' });
  }

  removeShip(brodId: number) {
    this.store.dispatch(BrodActions.removeBrod({ brodId }));
  }
}
