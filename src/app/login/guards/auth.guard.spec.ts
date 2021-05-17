import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let _router: Router;
  let _authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        AuthGuard,
        { provide: Router, useValue: { navigate: '' } },
      ],
    });
    service = TestBed.get(AuthGuard);
    _router = TestBed.get(Router);
    _authService = TestBed.get(AuthService);
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should call canActivate', () => {
    const redirect = ['/login'];
    spyOn(_router, 'navigate').and.callThrough();
    spyOn(_authService, 'checkCredentials').and.returnValue(false);
    service.canActivate();
    expect(_router.navigate).toHaveBeenCalledWith(redirect);
    expect(_authService.checkCredentials).toHaveBeenCalled();
  });
});
