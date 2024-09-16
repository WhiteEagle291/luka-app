

import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { Brod } from '../../models/brod';
import { Luka } from '../../models/luka';
import { AppState } from 'src/app/app.state';
import * as BrodActions from '../../store/brod.action';
import * as LukaActions from '../../store/luka.action';
import { selectAllBrods } from 'src/app/store/brod.selector';
import { AuthService } from 'src/app/auth.service';
import { BrodService } from 'src/app/services/brodovi.service';
import { selectAllPorts } from 'src/app/store/luka.selector';  

@Component({
  selector: 'app-luka',
  templateUrl: './luka.component.html',
  styleUrls: ['./luka.component.scss']
})
export class LukaComponent implements OnInit {
  @Input() luka: Luka = { id: 0, name: '', limit: 0 ,ships:[]};
  @Input() brodovi: Brod[] = [];
  @Input() isLoggedIn: boolean = false;  
  ports$: Observable<Luka[]>;  
  shipForm: FormGroup;
  portForm: FormGroup;
  searchControl: FormControl = new FormControl('');


  radarActive = false; 
  allShips: { name: string; port: string }[] = []; 
 
  data: any;

  ports: Luka[] = [];

  selectedPortId: number | null = null; 
  filteredShips: Brod[] = [];




  constructor(private store: Store<AppState>, private fb: FormBuilder,private authService: AuthService,private brodService:BrodService) {
    this.shipForm = this.fb.group({
      name: ['', Validators.required],
      type: ['Warship'],
      crew: [''],
      portId: [null, Validators.required] 
    });

    this.portForm = this.fb.group({
      name: ['', Validators.required],
      limit: ['', Validators.required],
    });

     this.ports$ = this.store.select(selectAllPorts);
  }
  //this.store.pipe(select(selectAllBrods))


  ngOnInit(): void {
  
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });


    console.log(this.isLoggedIn);
    this.store.dispatch(LukaActions.loadLukas());  
    this.store.dispatch(BrodActions.loadBrods());  
  
    this.ports$.subscribe(ports => {
      this.ports = ports;
      console.log('Received ports:', ports); 
    });
  
    this.store.select(selectAllBrods).subscribe((brodovi) => {
      console.log('Received ships:', brodovi); 
      this.brodovi = brodovi;
      this.filterShips(); 
    });

    
    combineLatest([
      this.store.select(selectAllBrods),
      this.shipForm.get('portId')!.valueChanges.pipe(
        startWith(this.shipForm.get('portId')?.value),
        map(portId => Number(portId)),
        distinctUntilChanged()
      ),
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([ships, selectedPortId, searchTerm]) => {
        return ships.filter((ship: Brod) => 
          ship.port && ship.port.id === selectedPortId &&
          ship.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    ).subscribe(filteredShips => {
      this.filteredShips = filteredShips;
    
    
      this.allShips = this.filteredShips.map(brod => ({
        name: brod.name,
        port: brod.port ? brod.port.name : 'Unknown'
      }));
    
     
      this.updateRadar(); 
    });


    this.shipForm.get('portId')?.setValue(this.shipForm.get('portId')?.value);

  
  // Nakon promene luke selektovati brodove koji pripadaju toj luci
  this.shipForm.get('portId')!.valueChanges.pipe(
    startWith(this.shipForm.get('portId')?.value),
    map(portId => Number(portId)),  
    distinctUntilChanged()
  ).subscribe(selectedPortId => {
    this.selectedPortId = selectedPortId;

    if (selectedPortId) {
      this.store.dispatch(BrodActions.loadBrodsByPortId({ portId: selectedPortId })); 
    }
  });
  
    // Inicijalizacija filtriranih brodova na osnovu id-ja selektovane luke
    const initialPortId = Number(this.shipForm.get('portId')?.value);
    this.selectedPortId = !isNaN(initialPortId) ? initialPortId : null;
    this.filterShips();
  }




  toggleRadar(): void {
    this.radarActive = !this.radarActive; 
    if (this.radarActive) {
      this.updateRadar(); 
    } else {
      this.clearRadar(); 
    }
  }

  filterShips() {
    console.log('Filtering ships for portId:', this.selectedPortId);
  
    if (this.selectedPortId !== null && !isNaN(this.selectedPortId)) {
      this.filteredShips = this.brodovi.filter(brod => {
        const brodPortIdNumber = brod.port ? Number(brod.port.id) : NaN;
        console.log('Comparing:', brodPortIdNumber, 'with', this.selectedPortId);
        return brodPortIdNumber === this.selectedPortId;
      });
      
      console.log('Filtered ships:', this.filteredShips);
  
      // Koristi se filteredShips za crtanja brodova na radaru
      this.allShips = this.filteredShips.map(brod => ({
        name: brod.name && brod.name.trim() !== '' ? brod.name : 'Unknown', 
        port: brod.port ? brod.port.name : 'Unknown' 
      }));
      
      console.log('Mapped ships:', this.allShips);
  
      // Trigger radar update
      this.updateRadar(); 
    } else {
      this.filteredShips = [];
      this.allShips = []; 
      this.updateRadar(); 
    }
  }


  updateRadar() {
    const radarElement = document.getElementById('radar');
    
   
    if (radarElement) {
      radarElement.innerHTML = '';
    }

  
    this.filteredShips.forEach(ship => {
     
      const randomDistance = Math.random() * 150;  
      const randomAngle = Math.random() * 360;     

    
      this.addShipToRadar(ship.name, ship.port ? ship.port.name : 'Unknown', randomDistance, randomAngle);
    });
  }


  clearRadar() {
    const radarElement = document.getElementById('radar');
    if (radarElement) {
      radarElement.innerHTML = ''; 
    }
  }

  
  addShipToRadar(shipName: string, portName: string, distance: number, angle: number) {
    const radarElement = document.getElementById('radar');
    
    if (radarElement) {
      const shipElement = document.createElement('div');
      shipElement.className = 'ship-dot';
      shipElement.innerText = `${shipName}`; 

      
      const radarWidth = radarElement.offsetWidth;
      const radarHeight = radarElement.offsetHeight;
      const centerX = radarWidth / 2;
      const centerY = radarHeight / 2;

     
      const radians = angle * (Math.PI / 180); 
      const x = centerX + distance * Math.cos(radians); 
      const y = centerY + distance * Math.sin(radians); 

  
      const maxDistance = Math.min(centerX, centerY); 
      const finalX = Math.min(Math.max(x, 0), radarWidth - 10);  
      const finalY = Math.min(Math.max(y, 0), radarHeight - 10); 

      shipElement.style.left = `${finalX}px`;
      shipElement.style.top = `${finalY}px`;

 
      radarElement.appendChild(shipElement);
    }
}


  addShip() {
    console.log(this.isLoggedIn);
    if(!this.isLoggedIn)
    {
      alert("Nisi logovan");
      return;
    }
    const selectedPortId = Number(this.shipForm.get('portId')?.value) || null;
    console.log('Selected Port ID from form:', selectedPortId); 
  
    const selectedPort = this.ports.find(port => port.id === selectedPortId);
    if (!selectedPort) {
      console.error('Port not found');
      return; 
    }
  
    const newShip: Brod = {
      id: 0, //uvek nula a generise se na backend
      name: this.shipForm.value.name,
      type: this.shipForm.value.type,
      crew: [this.shipForm.value.crew],
      port: selectedPort, 
      portId: selectedPortId 
    };
  
    console.log("Adding Ship with Port ID: ", selectedPortId); 
    this.store.dispatch(BrodActions.addBrod({ brod: newShip }));
    this.shipForm.reset({ type: 'Warship', crew: '', portId: selectedPortId  }); 
  }



  addPort() {
    const newPort: Luka = {
      id: 0,
      name: this.portForm.value.name,
      limit: this.portForm.value.limit,
      ships: [],
    };

    this.store.dispatch(LukaActions.addPort({ port: newPort }));
    this.portForm.reset();
  }


   removeShip(brodId: number) {
    this.store.dispatch(BrodActions.deleteBrod({ id: brodId }));
  }
  // removeShip(brodId: number) {
  //   if (this.luka) {
  //     const index = this.luka.ships.findIndex(b => b.id === brodId);
  //     if (index !== -1) {
  //       this.luka.ships.splice(index, 1);
  //     }
  //   }
  // }
}
