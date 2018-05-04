import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class BeerService {
  protected apiUrl;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + 'beers/';
   }

   getRandomBeer() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'random')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
