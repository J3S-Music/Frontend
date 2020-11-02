import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BackendcommService } from '../services/backendcomm.service';
import { Song } from './Song';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  constructor(private service: BackendcommService, private cookieservice: CookieService, private router: Router, private route:ActivatedRoute) { }

  headElements = ['Cover', 'Track', 'Artist', 'Album'];
  headElements2 = ['Cover', 'Track', 'Artist', 'Album', 'Upvotes', 'Downvotes', 'Delete'];
  public songs: Song[] = new Array();
  FormSearch = new FormControl('');
  public playlist: Song[] = new Array();
  private roomID;

  ngOnInit(): void {
    let cookieRoomID =  this.cookieservice.get('RoomID');
    let urlRoomID  = this.route.snapshot.paramMap.get('id');
    console.log("Cookie: "+cookieRoomID+", URL: "+urlRoomID);
    if(cookieRoomID===urlRoomID){
      this.roomID = this.cookieservice.get('RoomID');
      console.log(this.roomID);
      this.getPlaylist(this.roomID);
    }else{
      alert('Unauthorized!');
      this.router.navigate(['/home']);
    }

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

  addSong(song: Song): void {
    this.songs = [];
    this.service.addSong(this.roomID, song)
      .then(res => {
        this.getPlaylist(this.roomID);
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  delete(song: Song): void {
    this.songs = [];
    this.service.deleteSong(this.roomID, song.trackUID)
      .then(res => {
        this.getPlaylist(this.roomID);
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  upVote(song: Song): void {
    this.songs = [];
    this.service.upVote(this.roomID, song.trackUID)
      .then(res => {
        this.getPlaylist(this.roomID);
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  downVote(song: Song): void {
    this.songs = [];
    this.service.downVote(this.roomID, song.trackUID)
      .then(res => {
        this.getPlaylist(this.roomID);
      })
      .catch(error => {
        console.log(error);                  // error werfen
      });
  }

  getPlaylist(roomID): void {
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


  navigateBack(){
    this.router.navigate(['/room/'+this.roomID]);
  }


}
