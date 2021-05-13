import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { of, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  private validUsers: Array<string>;
  constructor(private _router: Router, private _http: HttpClient) {
    this.validUsers = ['admin', 'test'];
  }

  obtainAccessToken(loginData) {
    const isValid = this.validUsers.find((user) => user === loginData.userName);
    return isValid ? of(isValid) : throwError('error-login');
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + 1000 * 3600;
    Cookie.set('access_token', token, expireDate);
    this._router.navigate(['/competition-list']);
  }

  checkCredentials() {
    return Cookie.check('access_token') ? true : false;
  }

  logout() {
    Cookie.delete('access_token');
    window.sessionStorage.removeItem('favorite-competitions');
    this._router.navigate(['/login']);
  }
}
