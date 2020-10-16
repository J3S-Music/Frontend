import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { SessionBeitretenComponent } from './session-beitreten/session-beitreten.component';
import { SessionErstellenComponent } from './session-erstellen/session-erstellen.component';
import { HauptmenuComponent } from './hauptmenu/hauptmenu.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    EinstellungenComponent,
    SessionBeitretenComponent,
    SessionErstellenComponent,
    HauptmenuComponent,
    LoginComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }