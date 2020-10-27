import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import{ BackendcommService } from '../services/backendcomm.service';  //service importieren
import {CookieService} from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public cookieValue;

  FormName= new FormControl('');
  FormEmail= new FormControl('');
  FormPassword1= new FormControl('');
  FormPassword2= new FormControl('');


  constructor(private service: BackendcommService, private cookieService:CookieService, public router:Router) { }              //Service einfügen

  ngOnInit(): void {
  }

  checkPasswords(pw1,pw2) { 
    if(pw1===pw2){
      return true;
    }
    return false;
  }

  signUp(){
    let pw1 = this.FormPassword1.value;
    let pw2 = this.FormPassword2.value;
    let name = this.FormName.value;
    let email = this.FormEmail.value;
    
      if(pw1==="" || pw2===""|| name===""||email===""){
        alert("Please fill in all requiered fields!");
      }else{
        if(this.checkPasswords(pw1,pw2)){
          this.service.signUp(name, email, pw1)
              .then(res=> {
          // Success
          this.cookieValue=res;
          console.log(this.cookieValue);
          this.cookieService.set('UserID', this.cookieValue);
          this.router.navigate(['/home']);
          })
          
          .catch(error =>{
            console.log(error)                                        //error werfen
          })
        }
        else{
          alert("Passwords dont match!");
        }
      }
  }
}

