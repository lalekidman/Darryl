import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor() {
  }
  ngOnDestroy () {
    console.log('test destroy');
  }
  ngAfterViewInit () {
    console.log('test testt on after view init');
  }
  ngOnInit() {
    console.log('init init');
  }
}
