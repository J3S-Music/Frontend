import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SessionErstellenComponent} from './session-erstellen/session-erstellen.component';
import {SessionBeitretenComponent} from './session-beitreten/session-beitreten.component';
import {EinstellungenComponent} from  './einstellungen/einstellungen.component';
import {HauptmenuComponent} from './hauptmenu/hauptmenu.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'createSession', component: SessionErstellenComponent},
  {path: 'joinSession', component: SessionBeitretenComponent},
  {path: 'settings', component: EinstellungenComponent},
  {path: 'mainMenu', component: HauptmenuComponent},
  { path: 'login', component: LoginComponent},
  { path: '',   redirectTo: '/mainMenu', pathMatch: 'full' }, // redirect to mainmenu-component





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



  
 }
