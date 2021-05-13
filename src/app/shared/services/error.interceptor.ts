import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreService } from './core.service';
import { NotificationService } from './notification.service';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
  constructor(
    private _notificationService: NotificationService,
    private _coreServices: CoreService,
    private _router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse | any) => {
        const errorMessage = error?.message;
        switch (error.status) {
          case 404:
            this._router.navigate(['/not-found']);
            break;
          case 401:
            this._router.navigate(['/no-auth']);
            break;
          case 403:
            this._router.navigate(['/competition-list']);
            break;
          default:
            break;
        }
        this._coreServices.displaySpinner(false);
        this._notificationService.showNotification(errorMessage, false);
        return throwError(errorMessage);
      })
    );
  }
}
