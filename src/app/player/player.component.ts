import { Component, OnInit } from '@angular/core';
import { ExternalcommService } from '../services/externalcomm.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private externalService:ExternalcommService) { }

  ngOnInit(): void {
    const token=this.externalService.bearer;
    /*const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });*/

  }

}
