import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from 'src/environments/environment.development'

@Injectable()
export class TransformUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const  baseUrl  = environment.baseUrl
    console.log(baseUrl);
    const newReq = request.clone(
      { url: baseUrl + request.url }
    )
    console.log(newReq.url, 'new url from interceptor')
    
    return next.handle(newReq);
  }
}
