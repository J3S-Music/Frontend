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
    public email = '';
    public name = '';
    public avatar = '';
    public _default= '';
    public SpotifyStatus= false;
    public AppleStatus= false;
    public YoutubeStatus= false;
    public SoundcloudStatus= false;

//*****************************************GET BEFEHL*************************************************/
ngOnInit(): void {
  this.service.getData()

  .then(res => {
    // Success
    this.name = res['name'];
    this.email = res['email'];
    this.avatar = '../assets/' + res['avatar']['pictureName'];
    var connectionList = res['userConnections'];
    this._default=this.getDefault(connectionList);
    this.SpotifyStatus=this.getConnectionStatus(connectionList, 'Spotify');
    this.AppleStatus=this.getConnectionStatus(connectionList, 'Apple Music');
    this.SoundcloudStatus=this.getConnectionStatus(connectionList, 'Soundcloud');
    this.YoutubeStatus=this.getConnectionStatus(connectionList, 'Youtube');
    })
    .catch(error =>{
      console.log(error +' Keine userdaten')                  //error werfen
    })                                                        //resolve-> gehts in then bei catch also fehler reject
    
    

}
    
  getDefault(list):string{
    var def = '';
    list.forEach(function(value){
      if(value['_default']){
        def = value['connection']['name'];
        console.log('Found Default: '+def);
        return def;
      }
    });
    return def;
  }

  getConnectionStatus(list, connection){
    var status=false;
    list.forEach(function(value){
      if(value['connection']['name']===connection){
        status = value['active'];
        console.log(connection+" Status: "+status);
        return status;
      }
    });
    return status;
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

  isDefault(connection){
    return this._default===connection;
  }

  isConnected(connection){
    var status: boolean;
    switch(connection){
      case 'Spotify':{
        status=this.SpotifyStatus;
        break;
      }
      case 'Youtube':{
        //console.log("Youtube Connection");
        status=this.YoutubeStatus;
        break;
      }
      case 'Apple Music':{
        //console.log("Apple Connection");
        status=this.AppleStatus;
        break;
      }
      case 'Soundcloud':{
        //console.log("Soundcloud Connection");
        status=this.SoundcloudStatus;
        break;
      }
      default:{
        //console.log("Spasst");
        status=false;
        break;
      }
    }
    return status;
  }


}