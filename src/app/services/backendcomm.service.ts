import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Song } from '../playlist/Song';
import { ImageInformation } from '../playlist/ImageInformation';

@Injectable({
  providedIn: 'root'
})
export class BackendcommService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  getUserData(): Promise<any> {
    const userID = this.cookieService.get('UserID');
    const promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/users/' + userID)
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

  signUp(name: string, email: string, password: string): Promise<any> {
    const body = {
      'password': password,
      'name': name,
      'email': email,
      'avatar': {
        avatarID: 1
      },
      'role': {
        'roleID': 1
      }
    };
    const promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/users', body)
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

  signIn(email: string, password: string): Promise<any> {
    const body = {
      'password': password,
      'email': email

    };
    const promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/login', body)
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

  changeAvatar(avatarID: number): Promise<any> {
    const userID = this.cookieService.get('UserID');
    const body = {
      avatar: {
        'avatarID': avatarID
      }
    };
    const promise = new Promise((resolve, reject) => {
      this.http.put('http://localhost:8080/users/' + userID, body)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          });
    });
    return promise;
  }

  createRoom(roomname: string, password: string, connectionID: number): Promise<any> {
    const userID = this.cookieService.get('UserID');
    const body = {
      principle: 'Voting',
      roomName: roomname,
      roomCode: password,
      connection: {
        'connectionID': connectionID
      }
    };
    const params = new HttpParams()
      .set('id', userID);

    const promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/room/create', body, { params })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          });
    });
    return promise;
  }

  joinRoom(roomID: number, password: string): Promise<any> {
    const userID = this.cookieService.get('UserID');

    const params = new HttpParams()
      .set('userID', userID)
      .set('roomCode', password);

    const promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/room/' + roomID + '/join', { params })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          });
    });
    return promise;
  }


  getRoomData(): Promise<any> {
    const roomID = this.cookieService.get('RoomID');
    const promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/room/' + roomID)
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

  getConnectionData(): Promise<any> {
    const userID = this.cookieService.get('UserID');
    const promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/users/' + userID + '/connections')
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


  editSettings(name: string, email: string, password: string): Promise<any> {
    const userID = this.cookieService.get('UserID');
    const body = {
      'password': password,
      'name': name,
      'email': email,
    };

    const promise = new Promise((resolve, reject) => {
      this.http.put('http://localhost:8080/users/' + userID, body)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          });
    });
    return promise;
  }

  search(track: string): Promise<any> {
    const body = {
      'q': {
        'track': track
      },
      'type': [
        'track'
      ]
    };
    const promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/search', body)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error);
          });
    });
    return promise;
  }

  getPlaylist(roomID): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/room/' + roomID + '/playlist')
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

  deleteSong(roomID, songID): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http.delete('http://localhost:8080/room/' + roomID + '/playlist/' + songID)
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

  addSong(roomID, song: Song): Promise<any> {
    console.log(song.imageInformation);
    const body = {
      'track': song.track,
      'artist': song.artist,
      'album': song.album,
      'trackUID': song.trackUID,
      'upVotes': song.upVotes,
      'downVotes': song.downVotes,
      'imageInformation': song.imageInformation
    };
    console.log(body);
    const promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/room/' + roomID + '/playlist', body)
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

  upVote(roomID, songID): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/room/' + roomID + '/playlist/' + songID + '/upvote')
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

  downVote(roomID, songID): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/room/' + roomID + '/playlist/' + songID + '/downvote')
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

}
