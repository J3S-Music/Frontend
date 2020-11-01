import { Injectable } from '@angular/core';
import { ExternalcommService } from './externalcomm.service';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router, UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifycommService {

  constructor(private http: HttpClient,  private router: Router, private externalService:ExternalcommService) { }
  token=this.externalService.bearer;

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
