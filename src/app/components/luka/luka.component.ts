// luka.component.ts

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


import { selectAllPorts } from 'src/app/store/luka.selector';  // Import the selector
@Component({
  selector: 'app-luka',
  templateUrl: './luka.component.html',
  styleUrls: ['./luka.component.scss']
})
export class LukaComponent implements OnInit {
  @Input() luka: Luka = { id: 0, name: '', limit: 0 ,ships:[]};
  @Input() brodovi: Brod[] = [];
  ports$: Observable<Luka[]>;  
  shipForm: FormGroup;
  portForm: FormGroup;
  searchControl: FormControl = new FormControl('');
  
  data: any;

  ports: Luka[] = [];

  selectedPortId: number | null = null; // Track the selected port ID
  filteredShips: Brod[] = [];




  constructor(private store: Store<AppState>, private fb: FormBuilder,private authService: AuthService,private brodService:BrodService) {
    this.shipForm = this.fb.group({
      name: ['', Validators.required],
      type: ['Warship'],
      crew: [''],
      portId: [null, Validators.required] // Add portId here
    });

    this.portForm = this.fb.group({
      name: ['', Validators.required],
      limit: ['', Validators.required],
    });

     this.ports$ = this.store.select(selectAllPorts);
  }
  //this.store.pipe(select(selectAllBrods))


  ngOnInit(): void {

    this.store.dispatch(LukaActions.loadLukas());  // Load ports
    this.store.dispatch(BrodActions.loadBrods());  // Load ships
  
    this.ports$.subscribe(ports => {
      this.ports = ports;
      console.log('Received ports:', ports); // Debug log
    });
  
    this.store.select(selectAllBrods).subscribe((brodovi) => {
      console.log('Received ships:', brodovi); // Debug log
      this.brodovi = brodovi;
      this.filterShips(); // Ensure correct filtering
    });

    // Combine the ships observable, port ID observable, and search input observable
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
    });

    this.shipForm.get('portId')?.setValue(this.shipForm.get('portId')?.value);

  
    this.shipForm.get('portId')?.valueChanges.subscribe((portId: any) => {
      const parsedPortId = Number(portId);
      if (!isNaN(parsedPortId) && parsedPortId !== this.selectedPortId) {
        this.selectedPortId = parsedPortId;
        console.log('Updated Selected Port ID:', this.selectedPortId);
        this.filterShips(); // Filter ships whenever the port changes
      }
    });
  
    // Initialize the filter based on the initial value of portId
    const initialPortId = Number(this.shipForm.get('portId')?.value);
    this.selectedPortId = !isNaN(initialPortId) ? initialPortId : null;
    this.filterShips();
    // this.authService.getProtectedData().subscribe(data => {
    //   this.data = data;
    //   // Process and display your data here
    // });
  }

  // onPortChange(portId: number) {
  //   console.log('Port changed to:', portId);
  //   this.selectedPortId = portId;
  //   this.filterShips();
  // }

  filterShips() {
    console.log('Filtering ships for portId:', this.selectedPortId);

    if (this.selectedPortId !== null && !isNaN(this.selectedPortId)) {
      this.filteredShips = this.brodovi.filter(brod => {
        const brodPortIdNumber = brod.port ? Number(brod.port.id) : NaN;
        console.log('Comparing:', brodPortIdNumber, 'with', this.selectedPortId);
        return brodPortIdNumber === this.selectedPortId;
      });
  
      console.log('Filtered ships:', this.filteredShips);
    } else {
      this.filteredShips = [];
    }
  }
  addShip() {
    const selectedPortId = Number(this.shipForm.get('portId')?.value) || null; // Get the selected port ID
    console.log('Selected Port ID from form:', selectedPortId); // Debugging log
  
    const selectedPort = this.ports.find(port => port.id === selectedPortId);
    if (!selectedPort) {
      console.error('Port not found');
      return; // If no port is found, exit the function
    }
  
    const newShip: Brod = {
      id: 0, // This will be generated on the backend
      name: this.shipForm.value.name,
      type: this.shipForm.value.type,
      crew: [this.shipForm.value.crew],
      port: selectedPort, // Assign the full port object
      portId: selectedPortId // Send the portId to the backend
    };
  
    console.log("Adding Ship with Port ID: ", selectedPortId); // Debugging log
    this.store.dispatch(BrodActions.addBrod({ brod: newShip }));
    this.shipForm.reset({ type: 'Warship', crew: '', portId: null }); // Reset the form
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
