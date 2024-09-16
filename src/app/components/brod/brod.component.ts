
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
      // Otvara se popup i kloniraju se podaci trenutni , pa se onda menjaju
      this.isEditMode = true;
      this.editedBrod = { ...this.brod, crewString: this.brod.crew.join(', ') };
    }
  }

  onCancelEdit() {
    // Zatvori pop up ali ne cuva se promenjeno
    this.isEditMode = false;
  }

  onSaveEdit() {
    if (this.brod) {
      // Dodaje se zarez nakon imena clana posade
      const updatedCrew = this.editedBrod.crewString.split(',').map((crewMember: string) => crewMember.trim());

      const updatedBrod: Brod = {
        ...this.brod,
        name: this.editedBrod.name,
        type: this.editedBrod.type,
        crew: updatedCrew
      };

    
      this.store.dispatch(BrodActions.updateBrod({ brod: updatedBrod }));

     
      this.isEditMode = false;
    }
  }

  onDelete() {
    if (this.brod && this.brod.id) {
      
      this.store.dispatch(BrodActions.removeBrod({ brodId: this.brod.id })); 
    }
  }

  onAddUser() {
    if (this.brod && this.newUser.trim()) {
      this.brodService.addUserToCrew(this.brod.id, this.newUser.trim()).subscribe(
        updatedBrod => {
          this.brod = updatedBrod; 
          this.newUser = ''; 
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
