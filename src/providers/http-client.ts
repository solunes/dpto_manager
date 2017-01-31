import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpClient {
  token: string;

  constructor(public http: Http) {}

  createAuthorizationHeader(token) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

  get(url, token) {
    let headers = this.createAuthorizationHeader(token);
    console.log("get "+token);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, token, data) {
    let headers = this.createAuthorizationHeader(token);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
