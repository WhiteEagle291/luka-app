import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.state'; // Update this path if necessary
import { selectAllBrods } from './store/brod.selector';
import { Brod } from './models/brod';
import * as BrodActions from './store/brod.action';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { Luka } from './models/luka';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  title = 'Ship and Port Management';
  isLoggedIn = false;

  luka: Luka | undefined;  // Updated to allow dynamic assignment
  brodovi: Brod[] = []; // Store the ships received after login


  //brodovi$: Observable<Brod[]>; // Observable of array of Brods

  constructor(private store: Store<AppState>,private authService: AuthService) {
    //this.brodovi$ = this.store.pipe(select(selectAllBrods)); // Selecting all brods from store
  }

  ngOnInit() {
    // Dispatch an action to load ships from the store
    //this.store.dispatch(BrodActions.loadBrods());

    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngAfterViewInit() {
    // Ensure loginComponent is available after view initialization
    console.log('LoginComponent after view init:', this.loginComponent);
  }

  handleLoginSuccess(data: { luka: Luka; brodovi: Brod[] }) {
    console.log('Handle Login Success called with:', data);
    this.luka = data.luka;
    this.brodovi = data.brodovi;
  }

  addShipToPort(brod: Brod) {
    if (this.luka && this.luka.ships.length < this.luka.capacity) {
      this.luka.ships.push(brod);
    } else {
      alert('Port capacity reached! Cannot add more ships.');
    }
  }

  selectShip(brod: Brod) {
    console.log('Selected Ship:', brod);
  }

  removeShipFromPort(brod: Brod) {
    if (this.luka) {
      const index = this.luka.ships.findIndex(b => b.id === brod.id);
      if (index !== -1) {
        this.luka.ships.splice(index, 1);
      }
    }
  }

  openLogin(): void {
    setTimeout(() => {
      if (this.loginComponent) {
        this.loginComponent.openLogin();
      } else {
        console.error('LoginComponent is still not initialized.');
      }
    }, 0); // Delay the call to ensure the view has been initialized
  }


  onLogout() {
    this.authService.logout();
    console.log('Logout successful');
  }

  // Implement displayShipsAndPorts to display the data
  displayShipsAndPorts(data: { luka: Luka, brodovi: Brod[] }) {
    this.luka = data.luka;
    this.brodovi = data.brodovi;
  }
}
