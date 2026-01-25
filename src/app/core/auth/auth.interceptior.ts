import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';


export const authInterceptor : HttpInterceptorFn = ( req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const header = authService.authorizationHeader();

  if(!header) {
    return next(req);
  }

  if(!req.url.startsWith('/api')) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: header,
    }
  });

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401) {
        authService.logout();
        authService.setError("Your session has expired, please log in again.");
        void router.navigate([`/login`])
      }
      return throwError(() => error);
    })
  );

};
