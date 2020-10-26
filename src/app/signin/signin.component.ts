import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendcommService } from '../services/backendcomm.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public cookieValue;

  FormEmail= new FormControl('');
  FormPassword= new FormControl('');



  constructor(private service: BackendcommService, private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  signIn(){
    let email = this.FormEmail.value;
    let pw = this.FormPassword.value;

    if(pw==="" ||email===""){
      console.log("Please fill in all requiered fields!");
    }else{
      this.service.signIn(email,pw)
        
        .then(res=> {
        // Success
        this.cookieValue=res;
        console.log(this.cookieValue);
        this.cookieService.set('UserID', this.cookieValue);
        })
        .catch(error =>{
          console.log(error)                                        //error werfen
        })

    }


  }
}
