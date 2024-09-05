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
  isEditMode: boolean = false;
  editedBrod: any = {};

  constructor(private store: Store,private brodService: BrodService){}
  ngOnInit() {
    console.log('Brod Component Initialized with:', this.brod);
  }

  onEdit() {
    if (this.brod) {
      // Open the popup and clone the current brod details
      this.isEditMode = true;
      this.editedBrod = { ...this.brod, crewString: this.brod.crew.join(', ') };
    }
  }

  onCancelEdit() {
    // Close the popup without saving
    this.isEditMode = false;
  }

  onSaveEdit() {
    if (this.brod) {
      // Convert the comma-separated crew string into an array
      const updatedCrew = this.editedBrod.crewString.split(',').map((crewMember: string) => crewMember.trim());

      const updatedBrod: Brod = {
        ...this.brod,
        name: this.editedBrod.name,
        type: this.editedBrod.type,
        crew: updatedCrew
      };

      // Dispatch the updateBrod action to update the ship
      this.store.dispatch(BrodActions.updateBrod({ brod: updatedBrod }));

      // Close the popup after saving
      this.isEditMode = false;
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
