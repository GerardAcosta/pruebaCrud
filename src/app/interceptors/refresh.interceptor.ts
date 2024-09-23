import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {  
  const rutasEspecificas = ['/api/songs'];
  const tengoInterceptar = rutasEspecificas.some(rutas => req.url.includes(rutas));
  
  if(!tengoInterceptar) {
    console.log("Ruta no protegida");
    return(next(req));
  };

  console.log("Ruta protegida");
  const usersService = inject(UsersService);

  const token = usersService.getAccessToken();

  if (!token) {
    console.error("No se encontró Access Token");
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: token!
    }
  });

  return next(authReq).pipe(
    catchError((err) => {   // Si el Access esta caducado lo intenta refrescar con el Refresh.
      
      if (err.status === 401 || err.status === 403) {
        console.log("Estoy dentro del interceptor.")
        return usersService.refreshToken().pipe(
          switchMap((res) => {
            console.log("Estoy dentro del map.")
            localStorage.setItem('access_refresh', res.accessToken);
            console.log("Reiniciando Token")
            const newReq = req.clone({
              setHeaders: {
                Authorization: res.accessToken!
              }
            });

            return next(newReq);
          }),
          catchError((refreshErr) => {    // Si el Refresh esta caducado lo elimina.
            const finalError = new Error(refreshErr);

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            return throwError(() => finalError);
          })
        )
      }
      return throwError(() => err);
    })
  );
};
