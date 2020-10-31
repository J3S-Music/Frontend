import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendcommService } from '../services/backendcomm.service';

@Component({
  selector: 'app-session-beitreten',
  templateUrl: './session-beitreten.component.html',
  styleUrls: ['./session-beitreten.component.scss']
})
export class SessionBeitretenComponent implements OnInit {

  FormRoomcode = new FormControl('');
  FormRoomID = new FormControl('');

  constructor(private service: BackendcommService, private router: Router) { }

  ngOnInit(): void {
  }

  joinRoom(): void {
    const roomID = this.FormRoomID.value;
    const roomCode = this.FormRoomcode.value;
    this.service.joinRoom(roomID, roomCode)
      .then(res => {
        this.router.navigate(['/room/' + roomID]);                     // Id hinzufügen
      })
      .catch(error => {
        alert('Sind Sie behindert? Geben Sie bitte das richtige Passwort ein!');                                        // error werfen
      });





  }
}
