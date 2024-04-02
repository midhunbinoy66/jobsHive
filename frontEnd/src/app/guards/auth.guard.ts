import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isTokenExpired } from '../helpers/jwt-token';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = route.parent?.routeConfig?.path
  const token = localStorage.getItem(`${role}RefreshToken`);
  if(token === null || isTokenExpired(token)){
    if(role !== 'user'){
      void router.navigate([`${role}/login`]);
      return false;
    }
    void Swal.fire({
      title: 'You are not logged in',
      text: 'Do you want to redirect to login page',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        void router.navigate(['/user/login'])
      }
    })
    return false

  }
  return true;
};
