import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { NoAuthComponent, NotFoundComponent } from './alternative/components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './login/guards';
import { AuthService } from './login/services';
import { HttpLoaderFactory, SharedModule } from './shared/modules';
import { CoreService, TokenInterceptor } from './shared/services';
import { ErrorIntercept } from './shared/services/error.interceptor';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, NoAuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
    },
    AuthService,
    AuthGuard,
    CoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
