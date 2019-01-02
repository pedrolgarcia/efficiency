import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, mergeMap, merge, switchMap, filter, take } from 'rxjs/operators';
import { BASE_URL } from '../../app.api';
import { AuthService } from '../../login/auth.service';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private injector: Injector, private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      // const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

      // if (errorResponse.status === 401 && error.error === 'token expirado') {

      //   this.authService.refreshToken().subscribe();
      //   const cloneRequest = request.clone({ setHeaders: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
      //   return next.handle(cloneRequest);

      // }
      // return throwError(errorResponse);
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (request.url.includes('refresh') || request.url.includes('login')) {
        if (request.url.includes('refresh')) {
          this.auth.logout();
        }
        return throwError(error);
      }

      if (error.status !== 401) {
        return throwError(error);
      }

      if (this.refreshTokenInProgress) {

        return this.refreshTokenSubject
          .pipe(filter(result => result !== null))
          .pipe(take(1))
          .pipe(switchMap(() => next.handle(this.addAuthenticationToken(request))));
      } else {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);

        return this.auth
          .refreshToken()
          .pipe(switchMap((token: any) => {
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(token.access_token);

            return next.handle(this.addAuthenticationToken(request));
          }));
      }
    }));
  }

  addAuthenticationToken(request) {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
        return request;
    }

    return request.clone({
        setHeaders: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
}
}
