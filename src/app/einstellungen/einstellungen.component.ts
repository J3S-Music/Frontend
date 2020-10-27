import { Component, OnInit } from '@angular/core';
import{BackendcommService} from '../services/backendcomm.service';  //service importieren


import { Avatar } from '../avatar-selection/avatar';
import { AVATAR } from '../avatar-selection/list-data'
import { Router } from '@angular/router';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit {

  constructor(private service: BackendcommService, private router:Router) {

   }              //Service einfügen

public userid = '';
public name = '';
public avatar = '';



//*****************************************GET BEFEHL*************************************************/
ngOnInit(): void {
  this.service.getData()

  .then(res => {
    // Success
    this.name = res['name'];
    this.userid = res['userID'];
    this.avatar = '../assets/' + res['avatar']['pictureName'];
    //this.avatar = '../assets/' + res['user']['avatar'];
    //console.log(res['products']);
    })
    
    .catch(error =>{
      console.log(error +' Keine userdaten')                  //error werfen
    })                                                        //resolve-> gehts in then bei catch also fehler reject


}


  test(){
    this.service.getData()

    .then(res => {
      // Success
      console.log(res);
      })
      
      .catch(error =>{
        console.log(error +' Keine userdaten')                    //error werfen
      })                                                          //resolve-> gehts in then bei catch also fehler reject

  }
}