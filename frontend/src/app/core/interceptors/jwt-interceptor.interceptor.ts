import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
// si usas Router para redirigir en 401, descomenta estas dos líneas:
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DiccionarioMensajesErrorEnum } from '../enum/diccionario-mensajes-error';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token_bodegaarcana') || '';
  const router = inject(Router);
  // Detectar endpoints
  const isLogin = /\/auth\/login(\?|$)/.test(req.url);
  const isUsersCreate = req.method === 'POST' && /\/users(\?|$)/.test(req.url);

  let headers = req.headers;

  // 1) NO meter Authorization en /auth/login
  if (!isLogin && token) {
    // No pises un Authorization que ya venga seteado explícitamente
    if (!headers.has('Authorization')) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // 2) (Opcional) Bootstrap: agrega X-Setup-Token si no hay JWT y vas a crear usuario
  //    Guarda el setup token previamente en localStorage.setItem('setup_token', '...').
  if (isUsersCreate && !token) {
    const setupToken = localStorage.getItem('setup_token');
    if (setupToken && !headers.has('X-Setup-Token')) {
      headers = headers.set('X-Setup-Token', setupToken);
    }
  }

  const cloneRequest = req.clone({ headers });

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // const router = inject(Router); // <- descomenta si quieres redirigir en 401

      let errorMessage = '';
      let messageModal = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        errorMessage = `Server-side error: ${error.status} ${error.message}`;
      }

      // Mapea el código a tu diccionario
      const keys = Object.keys;
      for (const role of keys(DiccionarioMensajesErrorEnum)) {
        const roleAsKey = role as keyof typeof DiccionarioMensajesErrorEnum;
        if (roleAsKey === ('Error' + error.status)) {
          messageModal = DiccionarioMensajesErrorEnum[roleAsKey];
          break;
        }
      }

      // Log de diagnóstico
      console.log('Interceptor', error);
      console.log('Mensaje: ', errorMessage);
      console.log('Mensaje notificación: ', messageModal);

      // (Opcional) en 401 limpiar token y redirigir a login
      if (error.status === 401) {
         localStorage.removeItem('auth_token_bodegaarcana');
         router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
