import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class BreweryService {

  protected apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + 'beers';
   }



}
