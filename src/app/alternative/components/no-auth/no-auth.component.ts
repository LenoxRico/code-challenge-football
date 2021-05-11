import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-auth',
  styleUrls: ['./no-auth.component.scss'],
  templateUrl: `./no-auth.component.html`,
})
export class NoAuthComponent implements OnInit {
  route: string = '';
  constructor() {}

  ngOnInit() {
    this.route = '/login';
  }
}
