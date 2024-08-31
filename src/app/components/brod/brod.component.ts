// brod.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Brod } from 'src/app/models/brod';

@Component({
  selector: 'app-brod',
  templateUrl: './brod.component.html',
  styleUrls: ['./brod.component.scss']
})
export class BrodComponent {
  @Input() brod: Brod | undefined;
  @Output() brodRemoved = new EventEmitter<number>();

  ngOnInit() {
    console.log('Brod Component Initialized with:', this.brod);
  }

  removeBrod() {
    if (this.brod && this.brod.id) {
      this.brodRemoved.emit(this.brod.id);
    }
  }
}
