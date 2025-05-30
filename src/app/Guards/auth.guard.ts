import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('id_token') ||sessionStorage.getItem('Role')?true:false;
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;  // Prevent navigation to the requested route
  }};
