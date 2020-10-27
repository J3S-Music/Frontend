import { Component, OnInit } from '@angular/core';
import { BackendcommService } from '../services/backendcomm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar-selection',
  templateUrl: './avatar-selection.component.html',
  styleUrls: ['./avatar-selection.component.scss']
 
})

export class AvatarSelectionComponent implements OnInit {

  constructor(private service: BackendcommService, private router:Router) {
  }

  ngOnInit(): void {
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
