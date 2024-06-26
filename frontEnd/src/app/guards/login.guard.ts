import { CanActivateFn, Router } from '@angular/router';
import { isTokenExpired } from '../helpers/jwt-token';
import {  inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = route.parent?.routeConfig?.path;
  console.log(role);
  const token = localStorage.getItem(`${role}RefreshToken`);

  if(token === null || isTokenExpired(token)){
    return true;
  }else{
    void router.navigate([`/${role}/home`])
    return false
  }

};
