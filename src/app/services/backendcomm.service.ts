import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BackendcommService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  getData(): Promise<any> {
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

  createRoom(roomname: string, password: string): Promise<any> {
    const userID = this.cookieService.get('UserID');
    const body = {
      principal: 'Voting',
      roomName: roomname,
      roomCode: password,
    }
    const params = new HttpParams()
      .set('id', userID)

    const promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/rooms/create', body, { params })
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
    const body = {
      roomID: roomID,
      roomCode: password,
    }
    const params = new HttpParams()
      .set('id', userID)

    const promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/rooms/join', body, { params })
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

}
