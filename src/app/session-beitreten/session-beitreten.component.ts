import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-session-beitreten',
  templateUrl: './session-beitreten.component.html',
  styleUrls: ['./session-beitreten.component.scss']
})
export class SessionBeitretenComponent implements OnInit {

  FormRoomcode = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
