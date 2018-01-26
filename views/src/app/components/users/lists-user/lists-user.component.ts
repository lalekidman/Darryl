import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
@Component({
  selector: 'app-lists-user',
  templateUrl: './lists-user.component.html',
  styleUrls: ['./lists-user.component.css']
})
export class ListsUserComponent implements OnInit {
  users: any;
  constructor(private user: UsersService) {
    const self = this;
    user.lists().then(res => {
      self.users = res;
    });
    }

  ngOnInit() {
  }
}
