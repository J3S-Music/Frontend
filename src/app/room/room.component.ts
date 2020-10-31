import { Component, OnInit } from '@angular/core';
import { BackendcommService } from '../services/backendcomm.service';  // service importieren
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public roomName = '';
  public password = '';
  public roomID = '';
  public source = '';

  constructor(private service: BackendcommService, private router: Router, private cookieservice:CookieService) { }

  ngOnInit(): void {
    this.service.getRoomData()
      .then(res => {
        // Success
        this.roomName = res['roomName'];
        this.password = res['roomCode'];
        this.roomID = res['roomID'];
        this.source = res['connection']['name'];


      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

}
