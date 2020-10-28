import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionErstellenComponent } from './session-erstellen/session-erstellen.component';
import { SessionBeitretenComponent } from './session-beitreten/session-beitreten.component';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { HauptmenuComponent } from './hauptmenu/hauptmenu.component';
import { LoginComponent } from './login/login.component';
import { AvatarSelectionComponent } from './avatar-selection/avatar-selection.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  { path: 'room', component: RoomComponent },
  { path: 'settings', component: EinstellungenComponent },
  { path: 'home', component: HauptmenuComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to mainmenu-component
  { path: 'create', component: SessionErstellenComponent },
  { path: 'join', component: SessionBeitretenComponent },
  { path: 'avatar', component: AvatarSelectionComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'playlist', component: PlaylistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
