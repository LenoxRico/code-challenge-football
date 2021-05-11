import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@src/app/login/services';
import { Cookie } from 'ng2-cookies';

import { DefaultLanguage, Languages } from '../../interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  src = 'assets/logo.svg';
  languages = Languages;
  selectedLanguage = DefaultLanguage.code;

  constructor(
    private _authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    if (Cookie.check('language')) {
      this.selectedLanguage = Cookie.get('language');
    }
  }

  logout() {
    this._authService.logout();
  }

  useLanguage(language: string) {
    this.translate.use(language);
    Cookie.set('language', language);
  }
}
