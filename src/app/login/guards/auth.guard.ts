import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@src/app/login/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}
  canActivate(): boolean {
    const result = this._authService.checkCredentials();
    if (!result) this._router.navigate(['/login']);
    return result;
  }
}
