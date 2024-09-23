import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // let clonedRequest = req;

  // if(localStorage.getItem('auth_refresh')) {
    
  //   clonedRequest = req.clone({
  //     setHeaders: {
  //       Authorization: localStorage.getItem('auth_refresh')!
  //     }
  //   });
  // }
  
  return next(req);
};
