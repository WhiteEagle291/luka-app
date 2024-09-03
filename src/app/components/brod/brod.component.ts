// brod.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Brod } from 'src/app/models/brod';
import * as BrodActions from "src/app/store/brod.action"
@Component({
  selector: 'app-brod',
  templateUrl: './brod.component.html',
  styleUrls: ['./brod.component.scss']
})
export class BrodComponent {
  @Input() brod: Brod | undefined;
  @Output() brodRemoved = new EventEmitter<number>();
  @Output() brodAction = new EventEmitter<{ action: string, brod: Brod }>();

  constructor(private store: Store){}
  ngOnInit() {
    console.log('Brod Component Initialized with:', this.brod);
  }

  onEdit() {
    if (this.brod) {
      //this.store.dispatch(BrodActions.removeBrod({ brodId: this.brod.id })); // Dispatch removeBrod action
    }
  }

  onDelete() {
    if (this.brod && this.brod.id) {
      
      this.store.dispatch(BrodActions.removeBrod({ brodId: this.brod.id })); // Dispatch removeBrod action
    }
  }

  onAddUser() {
    if (this.brod) {
      this.brodAction.emit({ action: 'addUser', brod: this.brod });
    }
  }

  removeBrod() {
    if (this.brod && this.brod.id) {
      this.brodRemoved.emit(this.brod.id);
    }
  }
}
