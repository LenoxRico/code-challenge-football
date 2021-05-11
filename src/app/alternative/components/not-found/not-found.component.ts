import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: `./not-found.component.html`,
})
export class NotFoundComponent implements OnInit {
  route: string = '';
  constructor() {}

  ngOnInit() {
    this.route = '/login';
  }
}
