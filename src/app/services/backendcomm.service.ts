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
      console.log('test');
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
}
