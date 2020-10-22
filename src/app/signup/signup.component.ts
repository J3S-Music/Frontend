import { Component, OnInit } from '@angular/core';
import{ BackendcommService } from '../services/backendcomm.service';  //service importieren
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private service: BackendcommService) { }              //Service einfügen

  public name = 'blablabla1';
  public email = 'blablabla2';
  public password = 'blablabla3';

  ngOnInit(): void {
  }

  signUp(){
  
    this.service.signUp(this.name, this.email, this.password)

    .then(res => {
      // Success
      console.log(res);
      })
      
      .catch(error =>{
        console.log(error)                                        //error werfen
      })                                                          //resolve-> gehts in then bei catch also fehler reject
  }
}

