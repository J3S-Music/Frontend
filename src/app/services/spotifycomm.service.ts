import { Injectable } from '@angular/core';
import { ExternalcommService } from './externalcomm.service';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router, UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifycommService {

  constructor(private http: HttpClient,  private router: Router, private externalService:ExternalcommService) { }
  
  pause(bearer): Promise<any> {
    const url = 'https://api.spotify.com/v1/me/player/pause';
    const body = new HttpParams();
    const promise = new Promise((resolve, reject) => {
      this.http.put(url ,body,{ 
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer '+bearer)
        })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          }
        );
    });
    return promise;
  }

  playNext(bearer): Promise<any> {
    const url = 'https://api.spotify.com/v1/me/player/next';
    const body = new HttpParams();
    const promise = new Promise((resolve, reject) => {
      this.http.post(url ,body,{ 
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer '+bearer)
        })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          }
        );
    });
    return promise;
  }

  playPrevious(bearer): Promise<any> {
    const url = 'https://api.spotify.com/v1/me/player/previous';
    const body = new HttpParams();
    const promise = new Promise((resolve, reject) => {
      this.http.post(url ,body,{ 
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer '+bearer)
        })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          }
        );
    });
    return promise;
  }

  play(bearer): Promise<any> {
    const url = 'https://api.spotify.com/v1/me/player/play';
    const body = new HttpParams();
    const promise = new Promise((resolve, reject) => {
      this.http.put(url ,body,{ 
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer '+bearer)
        })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          }
        );
    });
    return promise;
  }

  addSongtoQueue(songID, bearer): Promise<any> {
    const url = 'https://api.spotify.com/v1/me/player/queue';
    const uriparam = 'spotify:track:'+songID;
    console.log(uriparam);
    const params = new HttpParams()
    .set('uri',uriparam);


    
    const promise = new Promise((resolve, reject) => {
      this.http.post(url, undefined, { 
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer '+bearer),params
        })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          }
        );
    });
    return promise;
  }
  
  playSong(songID, bearer): Promise<any> {
    const url = 'https://api.spotify.com/v1/me/player/play';
    const body = {
      'uris': ['spotify:track:' + songID]
    };
    const promise = new Promise((resolve, reject) => {
      this.http.put(url ,body,{ 
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer '+bearer)
        })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          }
        );
    });
    return promise;
  }


/*
  addSongtoPlaylist (): Promise<any>{
  const promise = new Promise((resolve, reject) => {
    
    this.http.post('https://accounts.spotify.com/api/token'{ 
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        error => { // Error Serverfehler
          reject(error);
        }
      );
  });
  return promise;
}


*/
}
