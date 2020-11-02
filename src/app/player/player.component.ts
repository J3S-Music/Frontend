import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { from, Observable } from 'rxjs';
import { Song } from '../playlist/Song';
import { BackendcommService } from '../services/backendcomm.service';
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
    private backendService: BackendcommService,
    private router: Router,
    private cookieservice: CookieService,
    private route: ActivatedRoute
  ) { }

  public bearer;
  private roomID;
  public song: Song;
  public songs: Song[] = new Array();

  ngOnInit(): void {
    let cookieRoomID = this.cookieservice.get('RoomID');
    let urlRoomID = this.route.snapshot.paramMap.get('id');
    this.bearer = localStorage.getItem('Bearer');
    console.log(this.bearer);
    if (cookieRoomID === urlRoomID) {
      if (this.bearer !== null) {
        this.roomID = this.cookieservice.get('RoomID');
        this.getNext();
        console.log(this.song);
        //this.playSong('1LGv7Ah6TXp1soAAIzzuGC');
      } else {
        alert("Token nicht vorhanden!");
        this.router.navigate(['/settings']);
      }
    } else {
      alert('Unauthorized!');
      this.router.navigate(['/home']);
    }
  }

  getNext(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.backendService.getNext(this.roomID)
        .then(
          res => {
            const next = new Song().deserialize(res);
            this.song = next;
            this.songs = [];
            this.songs.push(this.song);
            resolve(res);
          },
          error => { // Error Serverfehler
            alert('No next songs found! Please add a song to your playlist!');
            this.router.navigate(['/room/' + this.roomID + '/playlist']);
            reject(error);
          });
    });
    return promise;
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
    this.getNext()
      .then(
        res => {
          this.addSongtoQueue(this.song.trackUID);
          this.spotifyServcive.playNext(this.bearer)
          .then(res => {
            console.log('Spotify Next')
            // Success
          })
          .catch(error => {
            console.log(error);                  // error werfen
          });
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

  playSong() {
    this.spotifyServcive.playSong(this.song.trackUID, this.bearer)
      .then(res => {
        console.log('Spotify play Song')
        // Success
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  
  navigateBack(){
    this.router.navigate(['/room/'+this.roomID]);
  }







}


