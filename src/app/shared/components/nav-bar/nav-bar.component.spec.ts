import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { AuthService } from '@src/app/login/services';
import { DefaultLanguage, Languages } from '../../interfaces';
import { HttpLoaderFactory } from '../../modules';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let fixture: ComponentFixture<NavBarComponent>;
  let component: NavBarComponent;
  let translate: TranslateService;
  let _authService: AuthService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavBarComponent],
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
          { provide: AuthService, useValue: { logout: '' } },
          TranslateService,
        ],
      }).compileComponents();
      translate = TestBed.get(TranslateService);
      _authService = TestBed.get(AuthService);
      fixture = TestBed.createComponent(NavBarComponent);
      component = new NavBarComponent(_authService, translate);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language', () => {
    component.ngOnInit();
    expect(component.selectedLanguage).toBe(DefaultLanguage.code);
  });

  it('should select another language', () => {
    spyOn(translate, 'use').and.callThrough();
    component.useLanguage(Languages[0].code);
    expect(translate.use).toHaveBeenCalledWith(Languages[0].code);
  });

  it('should logout', () => {
    spyOn(_authService, 'logout').and.callThrough();
    component.logout();
    expect(_authService.logout).toHaveBeenCalled();
  });
});
