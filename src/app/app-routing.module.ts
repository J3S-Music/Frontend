import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SessionErstellenComponent} from './session-erstellen/session-erstellen.component';
import {SessionBeitretenComponent} from './session-beitreten/session-beitreten.component';
import {EinstellungenComponent} from  './einstellungen/einstellungen.component';
import {HauptmenuComponent} from './hauptmenu/hauptmenu.component';

const routes: Routes = [
  {path: 'CreateSession', component: SessionErstellenComponent},
  {path: 'JoinSession', component: SessionBeitretenComponent},
  {path: 'Settings', component: EinstellungenComponent},
  {path: 'Mainmenu', component: HauptmenuComponent},
  { path: '',   redirectTo: '/Mainmenu', pathMatch: 'full' }, // redirect to mainmenu-component




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



  
 }
