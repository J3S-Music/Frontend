import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendcommService {

  constructor(private http:HttpClient) { }


  getData(){
    let promise = new Promise((resolve, reject) => {
      this.http.get('https://api.predic8.de/shop/products/')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error =>{ // Error Serverfehler
            reject(error)
          }
        );
    });
    return promise;

  }

  
  addData(postTask: Object){
    let promise = new Promise((resolve, reject) => {
      this.http.post('https://api.predic8.de/shop/products/')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          error =>{ // Error Serverfehler
            reject(error)
          }
        );
    });
    return promise;

  }
}
