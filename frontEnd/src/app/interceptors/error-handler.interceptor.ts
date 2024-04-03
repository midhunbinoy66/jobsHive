import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment.development'
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private  readonly _router:Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse)=>{
        const role = request.url.slice(environment.baseUrl.length).split('/')[0];
        void Swal.fire(err.statusText,err.error.message,'error');
        return throwError(()=>err);
      })
    )
  }
}
