import { Component, OnInit } from '@angular/core';
import { BackendcommService } from '../services/backendcomm.service';  // service importieren
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ExternalcommService } from '../services/externalcomm.service';


@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})


export class EinstellungenComponent implements OnInit {

  constructor(private service: BackendcommService, private router: Router, private externalService: ExternalcommService, private route: ActivatedRoute) {

  }              
  public avatar = '';
  public default = '';
  public SpotifyStatus = false;
  public AppleStatus = false;
  public YoutubeStatus = false;
  public SoundcloudStatus = false;
  public token;
  public bearer;

  FormName = new FormControl('');
  FormEmail = new FormControl('');
  FormPassword1 = new FormControl('');
  FormPassword2 = new FormControl('');

 
  ngOnInit(): void {
    //Hole Userdaten von Datenbank aus Backend bei Initialisierung
    this.service.getUserData()
      .then(res => {
        //Speicher Ergebnisse aus Backend in Attribute
        this.FormName.setValue(res['name']);
        this.FormEmail.setValue(res['email']);
        this.FormPassword1.setValue(res['password']);
        this.FormPassword2.setValue(res['password']);
        this.avatar = '../assets/' + res['avatar']['pictureName'];
      })
      .catch(error => {
        console.log(error + ' Keine userdaten');
      });
    //Hole Connections von Datenbank aus Backend bei Initialisierung
    this.service.getConnectionData()
      .then(res => {
        //Speicher Ergebnisse aus Backend in Attribute
        this.default = this.getDefault(res);
        this.SpotifyStatus = this.getConnectionStatus(res, 'Spotify');
        this.AppleStatus = this.getConnectionStatus(res, 'Apple Music');
        this.SoundcloudStatus = this.getConnectionStatus(res, 'Soundcloud');
        this.YoutubeStatus = this.getConnectionStatus(res, 'Youtube');
      }).catch(error => {
        console.log(error + ' Keine userdaten');
      });

      //Speicher Authentication Token von Spotify zwischen
      this.route.queryParamMap.subscribe(queryParams => {
        this.token = queryParams.get("code")
      })
      if(this.token!==null){
        //Austausch Authentication Token und Bearer Token
        this.externalService.postSpotifyToken(this.token)
        .then(res => {
          this.bearer = res['access_token'];
        }).catch(error => {
          console.log(error);
        });
      }
  }

  //Gehe Connection Liste durch und setze Default Attribut
  getDefault(list): string {
    let def = '';
    list.forEach(value => {
      if (value['_default']) {
        def = value['connection']['name'];
        return def;
      }
    });
    return def;
  }

  //Hole Status von Connections
  getConnectionStatus(list, connection): boolean {
    let status = false;
    list.forEach(value => {
      if (value['connection']['name'] === connection) {
        status = value['active'];
        return status;
      }
    });
    return status;
  }

  //Überprüfung ob Default übergebene Connection ist
  isDefault(connection): boolean {
    return this.default === connection;
  }

  //Öffne Spotify Authentication
  getSpotifyToken(){
      this.externalService.getSpotifyToken();
  }

  //Setzte Connection Status von Checkbox
  isConnected(connection): boolean {
    let status: boolean;
    switch (connection) {
      case 'Spotify': {
        status = this.SpotifyStatus;
        break;
      }
      case 'Youtube': {
        // console.log("Youtube Connection");
        status = this.YoutubeStatus;
        break;
      }
      case 'Apple Music': {
        // console.log("Apple Connection");
        status = this.AppleStatus;
        break;
      }
      case 'Soundcloud': {
        // console.log("Soundcloud Connection");
        status = this.SoundcloudStatus;
        break;
      }
      default: {
        status = false;
        break;
      }
    }
    return status;
  }

  //Hole Settings aus Input Fields, Evaluation und speicher ins Backend
  public editSettings(): void {
    const name = this.FormName.value;
    const email = this.FormEmail.value;
    const password1 = this.FormPassword1.value;
    const password2 = this.FormPassword2.value;

    if (name === '' || email === '' || password1 === '' || password2 === '') {
      alert('Please fill in all requiered fields!');
    } else {
      if (this.checkPasswords(password1, password2)) {
        this.service.editSettings(name, email, password1)
          .then(res => {
        
            alert('Success');
          })
          .catch(error => {
            alert('Email already used!');                                        
          });
      }
      else {
        alert('Passwords dont match!');
      }
    }
  }

  //Überprüfe ob Passwörter gleich sein
  checkPasswords(pw1, pw2): boolean {
    if (pw1 === pw2) {
      return true;
    }
    return false;
  }

}
