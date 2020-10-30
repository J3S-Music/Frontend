import { Component, OnInit } from '@angular/core';
import { BackendcommService } from '../services/backendcomm.service';  // service importieren
import { Router } from '@angular/router';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit {

  constructor(private service: BackendcommService, private router: Router) {

  }              // Service einfügen
  public email = '';
  public name = '';
  public avatar = '';
  public default = '';
  public SpotifyStatus = false;
  public AppleStatus = false;
  public YoutubeStatus = false;
  public SoundcloudStatus = false;

  /*****************************************GET BEFEHL*************************************************/
  ngOnInit(): void {
    this.service.getUserData()
      .then(res => {
        // Success
        this.name = res['name'];
        this.email = res['email'];
        this.avatar = '../assets/' + res['avatar']['pictureName'];
      })
      .catch(error => {
        console.log(error + ' Keine userdaten');                  // error werfen
      });
      
      this.service.getConnectionData()
        .then(res => {
          this.default = this.getDefault(res);
          this.SpotifyStatus = this.getConnectionStatus(res, 'Spotify');
          this.AppleStatus = this.getConnectionStatus(res, 'Apple Music');
          this.SoundcloudStatus = this.getConnectionStatus(res, 'Soundcloud');
          this.YoutubeStatus = this.getConnectionStatus(res, 'Youtube');
        }).catch(error => {
          console.log(error + ' Keine userdaten'); 
        });

      // resolve-> gehts in then bei catch also fehler reject
  }

  getDefault(list): string {
    let def = '';
    list.forEach(value => {
      if (value['_default']) {
        def = value['connection']['name'];
        console.log('Found Default: ' + def);
        return def;
      }
    });
    return def;
  }

  getConnectionStatus(list, connection): boolean {
    let status = false;
    list.forEach(value => {
      if (value['connection']['name'] === connection) {
        status = value['active'];
        console.log(connection + ' Status: ' + status);
        return status;
      }
    });
    return status;
  }

  isDefault(connection): boolean {
    return this.default === connection;
  }

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
        // console.log("Spasst");
        status = false;
        break;
      }
    }
    return status;
  }
}
