import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';


export const authInterceptor : HttpInterceptorFn = ( req, next) => {
  const authService = inject(AuthService);

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

  return next(cloned);

};
