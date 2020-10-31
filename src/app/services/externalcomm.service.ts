import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { helpers } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ExternalcommService {

  constructor(private http: HttpClient,  private router: Router) { }

  getDataFromUrl(url:string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      "Access-Control-Allow-Origin" : "*"
      })}; 

    const promise = new Promise((resolve, reject) => {
      this.http.get(url ,httpOptions)
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


  
  getSpotifyToken() {
    const url="https://accounts.spotify.com/authorize";

    const header = new HttpHeaders()
    .set('Access-Control-Allow-Origin','*');

    const params = new HttpParams()
    .set('client_id', "870a3c3cbe9940308567e2148c1e89a9")
    .set('redirect_uri', "http://localhost:4200/settings")
    .set('response_type', "code");

    const options = {
      headers: header,
      params: params
    }

    //console.log(this.http.get(url , options));
    this.router.navigate([url, options]);

  }



}
