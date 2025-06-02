// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // o sessionStorage

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
