import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  NavBarComponent,
  NotificationComponent,
  SpinnerComponent,
} from '../components';
import { NotificationService } from '../services';
import { AngularMaterialsModule } from './angular-materials/angular-materials.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [SpinnerComponent, NavBarComponent, NotificationComponent],
  entryComponents: [NotificationComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    AngularMaterialsModule,
  ],
  exports: [
    FlexLayoutModule,
    SpinnerComponent,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    NavBarComponent,
    AngularMaterialsModule,
  ],
  providers: [NotificationService],
})
export class SharedModule {}
