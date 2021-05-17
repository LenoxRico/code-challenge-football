import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let _router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: { navigate: '' } }],
    });
    service = TestBed.get(AuthService);
    _router = TestBed.get(Router);
  });

  it('should call obtainAccessToken successfully', () => {
    const loginData = { userName: 'admin' };
    service.obtainAccessToken(loginData).subscribe((result) => {
      expect(result).toEqual(true);
    });
  });

  it('should call obtainAccessToken with error', () => {
    const loginData = { userName: 'wrongUser' };
    service.obtainAccessToken(loginData).subscribe((result) => {
      expect(result).not.toEqual(true);
    });
  });

  it('should call saveToken', () => {
    const redirect = ['/competition-list'];
    spyOn(_router, 'navigate').and.callThrough();
    service.saveToken('Test');
    expect(_router.navigate).toHaveBeenCalledWith(redirect);
  });

  it('should call checkCredentials as true', () => {
    const expireDate = new Date().getTime() + 1000 * 3600;
    Cookie.set('access_token', 'Test', expireDate);
    const getAccess = service.checkCredentials();
    expect(getAccess).toBeTrue();
  });

  it('should call logout', () => {
    const redirect = ['/login'];
    spyOn(_router, 'navigate').and.callThrough();
    service.logout();
    expect(_router.navigate).toHaveBeenCalledWith(redirect);
  });

  it('should call checkCredentials as false', () => {
    Cookie.delete('access_token');
    const getAccess = service.checkCredentials();
    expect(getAccess).toBeFalse();
  });
});
