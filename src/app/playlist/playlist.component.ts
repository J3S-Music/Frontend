import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BackendcommService } from '../services/backendcomm.service';
import { Song } from './Song';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  
  constructor(private service: BackendcommService, private cookieservice:CookieService, private router:Router) { }

  headElements = ['Cover', 'Track', 'Artist', 'Album'];
  headElements2 = ['Track', 'Artist', 'Album'];
  public songs: Song[] = new Array();
  FormSearch = new FormControl('');
  public playlist: Song[] = new Array();
  private roomID;
  
  ngOnInit(): void {
    this.roomID = this.cookieservice.get('RoomID');
    console.log(this.roomID);
    this.getPlaylist(this.roomID);
  }

  search(): void {
    // clear songs Array
    this.songs = [];
    // Get Search Query from User Input
    const query = this.FormSearch.value;
    // Call Backend
    this.service.search(query)
      .then(res => {
        // Save found songs in songs Array
        res.forEach(Object => {
          const song = new Song().deserialize(Object);
          this.songs.push(song);
        });
        console.log(this.songs);
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  addSong(song:Song): void{
    this.songs = [];
    console.log(song);
    this.service.addSong(this.roomID, song)
    .then(res => {
      this.getPlaylist(this.roomID);
    })
    .catch(error => {
      console.log(error);                  // error werfen
    });
  }



  getPlaylist(roomID): void{
    console.log(roomID);
    this.service.getPlaylist(roomID)
    .then(res => {
      // Success
      console.log(res);
      this.playlist = res;
    })
    .catch(error => {
      console.log(error);                  // error werfen
    });
  }


  checkStatus(): boolean {
    return this.songs.length !== 0;
  }

}
