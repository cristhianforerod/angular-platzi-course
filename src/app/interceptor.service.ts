import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '@core/services/token/token.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addToken(req);
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          token
        }
      });
      return req;
    }
    return req;
  }
}
