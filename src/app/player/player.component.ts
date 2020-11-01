import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ExternalcommService } from '../services/externalcomm.service';
import { SpotifycommService } from '../services/spotifycomm.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(
    private externalService:ExternalcommService,
    private spotifyServcive: SpotifycommService,
    private router:Router,
    private cookieservice:CookieService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {

    let cookieRoomID =  this.cookieservice.get('RoomID');
    let urlRoomID  = this.route.snapshot.paramMap.get('id');
    const token=this.externalService.bearer;
    if(cookieRoomID===urlRoomID){
      if(token===null){
        alert("Token nicht vorhanden!");
        this.router.navigate(['/settings']);
      }
    }else{
      alert('Unauthorized!');
      this.router.navigate(['/home']);
    }





    /*const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });*/ 

  }

}
