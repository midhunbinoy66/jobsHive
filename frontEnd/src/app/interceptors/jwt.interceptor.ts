import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isTokenExpired } from '../helpers/jwt-token';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private readonly router:Router,
    @Inject(AuthService) private readonly authService:AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.has('Bypass-Interceptor')) {
      console.log('bypassing interceptor from JwtInterceptor');
      return next.handle(request)
    }

    const urlArr = request.url.split('/');
    const user = urlArr[0];
    const route =urlArr[1];

    console.log('handling rotue:',route);
    console.log(urlArr,'urlArr');

    if(route === 'login'|| route ==='register' ){
      return next.handle(request);
    }

    if(route === 'validateOtp' || route==='resendOtp'){
        console.log('getting authToke,inside validateOtp or resend otp');
        const authToken = localStorage.getItem(user +'AuthToken');
        if(authToken != null){
          const authRequest = request.clone({
              setHeaders:{ Authorization:`Beraer ${authToken}`}
          });
          return next.handle(authRequest);
        }
        console.log('authToken not available');
        return next.handle(request);
    }


    const accessToken = localStorage.getItem(user+'AccessToken');
    console.log(accessToken,'access token');

    if(accessToken !== null && !isTokenExpired(accessToken)){
      const accessRequest  = request.clone({
        setHeaders:{Authorization:`Bearer ${accessToken}`}
      });
      console.log('hhandling access request');
      return next.handle(accessRequest)
    }

    console.log('removing access token');
    localStorage.removeItem(user + 'AccessToken')
    const refreshToken = localStorage.getItem(user + 'RefreshToken')
    console.warn(refreshToken, 'refresh token');


    if (refreshToken !== null && !isTokenExpired(refreshToken)) {
      console.log('accessToken is not available, generating new token');
      this.authService.getAccessToke(refreshToken).subscribe({
        next: (res) => {
          const newAccessToken = res.accessToken
          console.log(newAccessToken, 'new access token from backend');

          localStorage.setItem(user + 'AccessToken', newAccessToken)
          const newAccessRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${newAccessToken}` }
          });
          console.log('handling request with new access token');

          return next.handle(newAccessRequest)
        }
      })
    }

    console.warn('handling request without jwt token');
    return next.handle(request);
  }
}
