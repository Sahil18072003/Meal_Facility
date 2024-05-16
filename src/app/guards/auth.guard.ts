import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);

  if (authService.isloggedIn()) {
    return true;
  } else {
    alert('Please Login First!');
    // toast.error({ detail: 'ERROR', summary: 'Please Login First!' });
    router.navigate(['login']);
    return false;
  }
};
