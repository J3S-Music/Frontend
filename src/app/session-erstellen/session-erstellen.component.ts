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

  constructor(private service: BackendcommService, private router: Router) { }

  ngOnInit(): void {
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

    console.log(pw1 + pw2 + roomname)
    if (pw1 === '' || pw2 === '' || roomname === '') {
      alert('Please fill in all requiered fields!');
    } else {
      if (this.checkPasswords(pw1, pw2)) {
        this.service.createRoom(roomname, pw1)
          .then(res => {
            console.log(res)
            this.router.navigate(['/room' + res]);      // Id hinzufügen
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

}
