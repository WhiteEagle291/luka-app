import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LukaComponent } from './components/luka/luka.component';
import { BrodService } from './services/brodovi.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'luka', component: LukaComponent, canActivate:  [BrodService] },
  // other routes
  { path: '', redirectTo: '/luka', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
