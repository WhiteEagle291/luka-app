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
import * as LukaActions from './store/luka.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  title = 'Ship and Port Management';
  isLoggedIn = false;

  luka: Luka = { id: 0, name: 'Default Ime', limit: 10 ,ships:[]}; 
  brodovi: Brod[] = []; 


  //brods$: Observable<Brod[]>; // Observable of array of Brods

  constructor(private store: Store<AppState>,private authService: AuthService) {
    //this.brods$= this.store.pipe(select(selectAllBrods)); 
  }

  ngOnInit() {
    
     localStorage.removeItem('access_token');  
     

    this.store.dispatch(BrodActions.loadBrods());
    this.store.dispatch(LukaActions.loadLukas());

         this.authService.isLoggedIn$.subscribe((loggedIn) => {
          this.isLoggedIn = loggedIn;
      
          if (this.isLoggedIn) {
            this.store.dispatch(BrodActions.loadBrods());
            this.store.dispatch(LukaActions.loadLukas());
          }
        });
  }

  ngAfterViewInit() {
    console.log('LoginComponent after view init:', this.loginComponent);
  }

  handleLoginSuccess(data: { luka: Luka; brodovi: Brod[] }) {
    console.log('Login success event received:', data);
    this.luka = data.luka;
    this.brodovi = data.brodovi;
    this.isLoggedIn = true; 
  }

  addShipToPort(brod: string) {
    if (this.luka && this.luka.ships.length < this.luka.limit) {
      this.luka.ships.push(brod);
    } else {
      alert('Port capacity reached! Cannot add more ships.');
    }
  }

  selectShip(brod: Brod) {
    console.log('Selected Ship:', brod);
  }

 

  openLogin(): void {
    setTimeout(() => {
      if (this.loginComponent) {
        this.loginComponent.openLogin();
      } else {
        console.error('LoginComponent is still not initialized.');
      }
    }, 0); 
  }


  onLogout() {
    this.authService.logout();
    console.log('Logout successful');
    this.isLoggedIn = false;  
  }

}
