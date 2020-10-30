import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendcommService } from '../services/backendcomm.service';  // service importieren
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-erstellen',
  templateUrl: './session-erstellen.component.html',
  styleUrls: ['./session-erstellen.component.scss']
})


export class SessionErstellenComponent implements OnInit {

  FormRoomName = new FormControl('');
  FormPassword1 = new FormControl('');
  FormPassword2 = new FormControl('');
  FormSource = new FormControl('');
  public SelectedNothing = true;
  public SpotifySelect = false;
  public AppleSelect = false;
  public SoundcloudSelect = false;
  public YoutubeSelect = false;
  public default: number;
  public source: number;


  constructor(private service: BackendcommService, private router: Router) { }

  ngOnInit(): void {
    this.setDefault();
  }

  setDefault(){
    this.service.getConnectionData()
    .then(res => {
      this.default = this.getDefault(res);
      this.selectDefault();
    })
    .catch(error => {
      console.log(error + ' Keine userdaten');                  // error werfen
    });
  }

  getDefault(list): number {
    let def;
    list.forEach(value => {
      if (value['_default']) {
        def = value['connection']['connectionID'];
        return def;
      }
    });
    return def;
  }

  checkPasswords(pw1, pw2): boolean {
    if (pw1 === pw2) {
      return true;
    }
    return false;
  }

  createRoom(): void {
    const pw1 = this.FormPassword1.value;
    const pw2 = this.FormPassword2.value;
    const roomname = this.FormRoomName.value;
    if(this.FormSource.value!==''){
      this.source = this.FormSource.value;
    }
    console.log('PW1: '+pw1+', PW2: ' + pw2 +', RoomName: '+ roomname +', Source: '+ this.source);
    if (pw1 === '' || pw2 === '' || roomname === '' || this.source ===null) {
      alert('Please fill in all requiered fields!');
    } else {
      if (this.checkPasswords(pw1, pw2)) {
        this.service.createRoom(roomname, pw1, this.source)
          .then(res => {
            console.log(res)
            this.router.navigate(['/room/' + res]);                     // Id hinzufügen
          })
          .catch(error => {
            console.log(error);                                        // error werfen
          });
      }
      else {
        alert('Passwords dont match!');
      }
    }
  }

  selectDefault(){
    console.log(this.default);
      switch(this.default){
        case 1:{
          this.SpotifySelect = true;
          this.source = 1;
          console.log('Spotify select'+this.source);
          break;
        }
        case 2:{
          this.AppleSelect = true;
          this.source = 2;
          console.log('Apple select'+this.source);
          break;
        }
        case 3:{
          this.SoundcloudSelect = true;
          this.source = 3;
          console.log('Soundcloud select'+this.source);
          break;
        }
        case 4:{
          this.YoutubeSelect = true;
          this.source = 4;
          console.log('Youtube select'+this.source);
          break;
        }
        default:{
          this.SelectedNothing = true;
          console.log('Nothing select');
          break;
        }
      }
    }
  }



