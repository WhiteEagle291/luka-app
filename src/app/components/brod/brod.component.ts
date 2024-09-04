// brod.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Brod } from 'src/app/models/brod';
import * as BrodActions from "src/app/store/brod.action"
import { BrodService } from 'src/app/services/brodovi.service';
@Component({
  selector: 'app-brod',
  templateUrl: './brod.component.html',
  styleUrls: ['./brod.component.scss']
})
export class BrodComponent {
  @Input() brod: Brod | undefined;
  @Output() brodRemoved = new EventEmitter<number>();
  @Output() brodAction = new EventEmitter<{ action: string, brod: Brod }>();

  newUser: string = '';

  constructor(private store: Store,private brodService: BrodService){}
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
    if (this.brod && this.newUser.trim()) {
      this.brodService.addUserToCrew(this.brod.id, this.newUser.trim()).subscribe(
        updatedBrod => {
          this.brod = updatedBrod; // Update the component's brod object with the returned value
          this.newUser = ''; // Clear the input field
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
    }
  }

  removeBrod() {
    if (this.brod && this.brod.id) {
      this.brodRemoved.emit(this.brod.id);
    }
  }
}
