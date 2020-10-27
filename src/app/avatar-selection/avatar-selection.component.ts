import { Component, OnInit } from '@angular/core';
import { BackendcommService } from '../services/backendcomm.service';

import { Avatar } from '../avatar-selection/avatar';
import { AVATAR } from '../avatar-selection/list-data'
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar-selection',
  templateUrl: './avatar-selection.component.html',
  styleUrls: ['./avatar-selection.component.scss']
 
})

export class AvatarSelectionComponent implements OnInit {
  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;
  avatarList: Avatar[] = AVATAR;


  constructor(private service: BackendcommService, private router:Router) {
    this.avatarList = AVATAR;
    this.radioSelected = "Avatar_1";
    this.getSelecteditem();
  }

  ngOnInit(): void {
  }
  onItemChange(avatar) {
    this.getSelecteditem();
  }

  getSelecteditem() {
    this.radioSel = AVATAR.find(Avatar => Avatar.value === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  changeAvatar(id) {
    console.log(id);
    this.service.changeAvatar(id)
    .then(res=> {
    // Success
    console.log(res);
      this.router.navigate(["/settings"]);
    })
    .catch(error =>{
      console.log(error)                                        //error werfen
    })
  }
}
