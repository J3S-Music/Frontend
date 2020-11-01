import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router, UrlSerializer } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ExternalcommService {

  constructor(private http: HttpClient,  private router: Router,  private serializer: UrlSerializer) { }
  public bearer;
    

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
    const client_id = '870a3c3cbe9940308567e2148c1e89a9';
    const redirect_uri='http://localhost:4200/settings';
    const response_type= 'code';
    const scope='streaming user-read-email user-read-private user-read-currently-playing user-read-playback-state user-modify-playback-state';
    let URL=url+'?'+'client_id='+client_id+'&redirect_uri='+redirect_uri+'&response_type='+response_type+'&scope='+scope;
    console.log(URL);
    window.location.href = URL;
  }

  postSpotifyToken(token): Promise<any> {
    console.log(token);
      const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', token)
      .set('redirect_uri', 'http://localhost:4200/settings')
      .set('client_id','870a3c3cbe9940308567e2148c1e89a9')
      .set('client_secret','272850bedb42480a9d4015ed9bde9bd5');

    const promise = new Promise((resolve, reject) => {

      this.http.post('https://accounts.spotify.com/api/token', body,{ 
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
            this.bearer = res['access_token'];
            console.log(this.bearer);
          },
          error => { // Error Serverfehler
            reject(error);
          }
        );
    });
    return promise;
  }



}
