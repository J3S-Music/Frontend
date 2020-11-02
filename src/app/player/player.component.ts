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
    private externalService: ExternalcommService,
    private spotifyServcive: SpotifycommService,
    private router: Router,
    private cookieservice: CookieService,
    private route: ActivatedRoute
  ) { }

  public bearer;
  ngOnInit(): void {

    let cookieRoomID = this.cookieservice.get('RoomID');
    let urlRoomID = this.route.snapshot.paramMap.get('id');
    this.bearer = localStorage.getItem('Bearer');
    console.log(this.bearer);
    if (cookieRoomID === urlRoomID) {
      if (this.bearer !== null) {
        this.playSong('1LGv7Ah6TXp1soAAIzzuGC');
      } else {
        alert("Token nicht vorhanden!");
        this.router.navigate(['/settings']);
      }
    } else {
      alert('Unauthorized!');
      this.router.navigate(['/home']);
    }
  }

  pause() {
    this.spotifyServcive.pause(this.bearer)
      .then(res => {
        console.log('Spotify paused')
        // Success
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  playNext() {
    this.spotifyServcive.playNext(this.bearer)
      .then(res => {
        console.log('Spotify Next')
        // Success
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  playPrevious() {
    this.spotifyServcive.playPrevious(this.bearer)
      .then(res => {
        console.log('Spotify previous')
        // Success
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  play() {
    this.spotifyServcive.play(this.bearer)
      .then(res => {
        console.log('Spotify play')
        // Success
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  addSongtoQueue(songID) {
    this.spotifyServcive.addSongtoQueue(songID, this.bearer)
      .then(res => {
        console.log('Spotify add Queue')
        // Success
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  playSong(songID) {
    this.spotifyServcive.playSong(songID, this.bearer)
      .then(res => {
        console.log('Spotify play Song')
        // Success
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }







}


