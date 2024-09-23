import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if(localStorage.getItem('access_refresh')) {
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
