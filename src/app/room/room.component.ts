import { Component, OnInit } from '@angular/core';
import { BackendcommService } from '../services/backendcomm.service';  // service importieren
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public roomName = '';
  public password = '';
  public roomID = '';

  constructor(private service: BackendcommService, private router: Router) { }

  ngOnInit(): void {
    this.service.getRoomData()
      .then(res => {
        // Success
        this.roomName = res['roomName'];
        this.password = res['roomCode'];
        this.roomID = res['roomID'];

      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

}
