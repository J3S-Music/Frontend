import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BackendcommService {

  constructor(private http: HttpClient , private cookieService:CookieService) { }


  getData() {
    var userID = this.cookieService.get("UserID");
    let promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/users/'+userID)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error)
          }
        );
    });
    return promise;

  }


  signUp( name: String, email: String, password: String) {
    var body = {
      'password': password,
      'name': name,
      'email': email,
      avatar: {
        'avatarID': 1
      }};
    let promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/users',body)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error)
          }
        );
    });
    return promise;
  }

  signIn(email:String, password:String){
    var body = {
      'password': password,
      'email': email
    };
    let promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/login',body)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error => { // Error Serverfehler
            reject(error)
          }
        );
    });
    return promise;
  }

  changeAvatar(avatarID: number){
    var userID = this.cookieService.get("UserID");
    var body = {
      avatar: {
        'avatarID': avatarID
      }};
      let promise = new Promise((resolve, reject) => {
        this.http.put('http://localhost:8080/users/'+userID,body)
          .toPromise()
          .then(
            res => { // Success
              resolve(res);
            },
            error => { // Error Serverfehler
              reject(error)
            }
          );
      });
      return promise;
  }
}
