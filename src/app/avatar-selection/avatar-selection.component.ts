import { Component, OnInit } from '@angular/core';
import { BackendcommService } from '../services/backendcomm.service';

@Component({
  selector: 'app-avatar-selection',
  templateUrl: './avatar-selection.component.html',
  styleUrls: ['./avatar-selection.component.scss']

})
export class AvatarSelectionComponent implements OnInit {

  content1: "";
  content2: "";
  content3: "";
  content4: "";
  content5: "";
  content6: "";

  constructor(private service: BackendcommService) { }

  ngOnInit(): void {
  }

  changeAvatar(){
    /*this.service.changeAvatar(avatarID)
    .then(res=> {
    // Success
    console.log(res);
    })
    .catch(error =>{
      console.log(error)                                        //error werfen
    })*/
  }
}
