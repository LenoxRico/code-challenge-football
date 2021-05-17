import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from '@src/app/shared/modules';
import { CoreService, NotificationService } from '@src/app/shared/services';
import { of } from 'rxjs';
import { AuthService } from '../../services';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let translate: TranslateService;
  let _authService: AuthService;
  let _notificationService: NotificationService;
  let _route: ActivatedRoute;
  let _coreServices: CoreService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          HttpClientTestingModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
            },
          }),
        ],
        providers: [
          {
            provide: AuthService,
            useValue: { logout: '', obtainAccessToken: of(true) },
          },
          TranslateService,
          NotificationService,
          { provide: ActivatedRoute, useValue: { queryParams: of('') } },
          { provide: CoreService, useValue: { displaySpinner: '' } },
          MatSnackBar,
          Overlay,
        ],
      }).compileComponents();
      translate = TestBed.get(TranslateService);
      _authService = TestBed.get(AuthService);
      _notificationService = TestBed.get(NotificationService);
      _route = TestBed.get(ActivatedRoute);
      _coreServices = TestBed.get(CoreService);
      fixture = TestBed.createComponent(LoginComponent);
      component = new LoginComponent(
        _authService,
        translate,
        _notificationService,
        _route,
        _coreServices
      );
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial params', () => {
    spyOn(component, 'validateParamUser').and.callThrough();
    spyOn(component, 'prepareForm').and.callThrough();
    component.ngOnInit();
    expect(component.validateParamUser).toHaveBeenCalled();
    expect(component.prepareForm).toHaveBeenCalled();
  });

  it('should call validateParamUser', () => {
    spyOn(component, 'login').and.callThrough();
    _route.queryParams.subscribe((params) => {
      if (params.username) {
        expect(component.login).toHaveBeenCalled();
      } else {
        expect(component.login).not.toHaveBeenCalled();
      }
    });
  });
});
