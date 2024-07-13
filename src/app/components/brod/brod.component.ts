import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brod } from 'src/app/models/brod';

@Component({
  selector: 'app-brod',
  templateUrl: './brod.component.html',
  styleUrls: ['./brod.component.scss']
})
export class BrodComponent {
  @Input() brod: Brod | undefined;
  @Output() shipSelected = new EventEmitter<Brod>();
  @Output() shipAdded = new EventEmitter<Brod>();
  @Output() shipRemoved = new EventEmitter<Brod>();

  selectShip() {
    this.shipSelected.emit(this.brod);
  }

  addShipToScreen() {
    this.shipAdded.emit(this.brod);
  }

  removeShipFromScreen() {
    this.shipRemoved.emit(this.brod);
  }
}