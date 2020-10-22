import { Component, OnInit } from '@angular/core';
import{ BackendcommService } from '../services/backendcomm.service';  //service importieren
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signUp(){
  
  }
}

