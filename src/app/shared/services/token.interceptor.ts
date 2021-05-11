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
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Access-Control-Allow-Origin', '*')
        .set("Access-Control-Allow-Credentials", "true")
        // .set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
        .set("Access-Control-Allow-Headers", "*")
      });
    }
    return next.handle(formattedRequest);
  }
}
