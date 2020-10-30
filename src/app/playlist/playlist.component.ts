import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendcommService } from '../services/backendcomm.service';
import { Song } from './Song';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public songs:Song[] = new Array();
  constructor(private service: BackendcommService) { }



  FormSearch = new FormControl('');
  ngOnInit(): void {
  }


  search(){
    //clear songs Array
    this.songs=[];
    //Get Search Query from User Input
    const query = this.FormSearch.value; 
    //Call Backend
    this.service.search(query)
    .then(res => {
      //Save found songs in songs Array
      res['items'].forEach(Object => {
        var song =new Song().deserialize(Object);
        this.songs.push(song);
      });
      console.log(this.songs);
    })
    .catch(error => {
      console.log(error);                  // error werfen
    });

  }



}
