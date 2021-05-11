import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Cookie } from 'ng2-cookies';

import { DefaultLanguage } from './shared/interfaces';
import { CoreService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  show = false;

  constructor(
    private coreService: CoreService,
    private translate: TranslateService
  ) {
    if (Cookie.check('language')) {
      translate.setDefaultLang(Cookie.get('language'));
      translate.use(Cookie.get('language'));
    } else {
      translate.setDefaultLang(DefaultLanguage.code);
      translate.use(DefaultLanguage.code);
    }
  }

  ngOnInit() {
    this.coreService.getSpinner().subscribe((state) => {
      setTimeout(() => {
        this.show = state.show;
      }, 0);
    });
  }
}
