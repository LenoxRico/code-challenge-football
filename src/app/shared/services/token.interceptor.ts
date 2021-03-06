import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let formattedRequest = request;
    if (!request.headers.has('Accept')) {
      formattedRequest = request.clone({
        headers: request.headers
          .set('Accept', 'application/json, text/plain, */*')
          // .set('Content-Type', 'application/json; charset=utf-8')
          // .set('Access-Control-Allow-Origin', '*')
          .set('X-Auth-Token', '8c9d9bd9c3b04bd9b67a299e407fb049'),
      });
    }
    return next.handle(formattedRequest);
  }
}
