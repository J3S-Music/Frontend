import { Component, OnInit } from '@angular/core';
import{BackendcommService} from '../services/backendcomm.service';  //service importieren
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
public _default='';

//*****************************************GET BEFEHL*************************************************/
ngOnInit(): void {
  this.service.getData()

  .then(res => {
    // Success
    this.name = res['name'];
    this.userid = res['userID'];
    this.avatar = '../assets/' + res['avatar']['pictureName'];

    var connectionList = res['userConnections'];
    this._default=this.getDefault(connectionList);
    })
    .catch(error =>{
      console.log(error +' Keine userdaten')                  //error werfen
    })                                                        //resolve-> gehts in then bei catch also fehler reject
    


}
    
  getDefault(list):string{
    var def = '';
    list.forEach(function(value){
      if(value['_default']){
        def = value['connection']['name'] as string
        console.log("Found Default: "+def);
        return def;
      }
    });
    return def;
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


  changeDefault(connection){
    var _default='';

    
    
  }
  setchecked(item){
    console.log(item);


  }
  isDefault(connection){
    //console.log(this._default);
    //console.log(this._default===connection);
    return this._default===connection;
  }


}