// app.module.ts

import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { brodReducer } from './store/brod.reducer'; // Ensure this path is correct
import { HttpClientModule } from '@angular/common/http';
import { BrodService } from './services/brodovi.service';
import { BrodComponent } from './components/brod/brod.component';
import { LukaComponent } from './components/luka/luka.component'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { BrodEffects } from './store/brod.effects';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { lukaReducer } from './store/luka.reducer';
import { LukaEffects } from './store/luka.effects';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Other routes...
];

@NgModule({
  declarations: [
    AppComponent,
    BrodComponent,
    LukaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      brod: brodReducer,
      luka: lukaReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    EffectsModule.forRoot([BrodEffects, LukaEffects]),
    RouterModule.forRoot(routes)
  ],
  providers: [BrodService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
