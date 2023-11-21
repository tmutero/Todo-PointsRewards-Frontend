import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authreq = request;
    authreq = this.AddTokenheader(
      request,
      this.authenticationService.getToken()
    );
    return next.handle(authreq).pipe(
      catchError((errordata) => {
        if (errordata.status === 401) {
            this.authenticationService.logout();
        }
        return throwError(errordata);
      })
    );
  }

  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
