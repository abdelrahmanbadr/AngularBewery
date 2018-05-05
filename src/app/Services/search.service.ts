import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  protected apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + 'search/';
  }
  search(query,type) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl +query+"/"+type)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
