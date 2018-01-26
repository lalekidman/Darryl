import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch'
// import 'rxjs/add/operator/retry'
// import 'rxjs/add/observable/of'

@Injectable()
export class HttpService {
  readonly ROOT_URL = 'http://192.168.88.40:1430';
  // posts: Observable;
  constructor(public http: Http) {
  }
  get(url) {
    const self = this;
    // return self.http.get('https://jsonplaceholder.typicode.com/users')
    return self.http.get(self.ROOT_URL.concat(url))
      .map(res => res.json());
  }
}
