import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UsersService {
  data: Users[];
  constructor(private http: HttpService) {

  }

  lists () {
    const self = this;
    return new Promise((resolve, reject) => {
      self.http.get('/api/users/lists')
        .subscribe((users) => {
          self.data = users.data;
          resolve(self.data);
        });
    });
  }
}
interface Users {
  id: string;
  email: string;
  username: string;
  name: string;
  roles: string[];
  license: {
    id: string,
    name: string
  };
}
