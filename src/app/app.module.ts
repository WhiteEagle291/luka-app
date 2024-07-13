// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { brodReducer } from './store/brod.reducer'; // Ensure this path is correct
import { HttpClientModule } from '@angular/common/http';
import { BrodService } from './services/brodovi.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ brodovi: brodReducer })
  ],
  providers: [BrodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
