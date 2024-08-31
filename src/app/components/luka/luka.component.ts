// luka.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Brod } from '../../models/brod';
import { Luka } from '../../models/luka';
import { AppState } from 'src/app/app.state';
import * as BrodActions from '../../store/brod.action';
import * as LukaActions from '../../store/luka.action';
import { selectAllBrods } from 'src/app/store/brod.selector';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-luka',
  templateUrl: './luka.component.html',
  styleUrls: ['./luka.component.scss']
})
export class LukaComponent implements OnInit {
  @Input() luka: Luka | undefined;
  @Input() brodovi: Brod[] = [];
  shipForm: FormGroup;
  data: any;

  constructor(private store: Store<AppState>, private fb: FormBuilder,private authService: AuthService) {


    this.shipForm = this.fb.group({
      name: ['', Validators.required],
      type: ['Warship'],
      crew: ['']
    });
  }

  ngOnInit(): void {
    // this.authService.getProtectedData().subscribe(data => {
    //   this.data = data;
    //   // Process and display your data here
    // });
  }

  addShip() {
    const newShip: Brod = {
      id: 0,
      name: this.shipForm.value.name,
      type: this.shipForm.value.type,
      crew: [this.shipForm.value.crew]
    };

    this.store.dispatch(BrodActions.addBrod({ brod: newShip }));
    this.shipForm.reset({ type: 'Warship', crew: '' });
  }

  removeShip(brodId: number) {
    if (this.luka) {
      const index = this.luka.ships.findIndex(b => b.id === brodId);
      if (index !== -1) {
        this.luka.ships.splice(index, 1);
      }
    }
  }
}
