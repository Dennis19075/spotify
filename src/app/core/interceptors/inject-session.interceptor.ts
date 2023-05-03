import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieSerice: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token = this.cookieSerice.get('token');
      let newRequest = request;
      newRequest = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
      return next.handle(newRequest);
    } catch (error) {
      console.log("ERROR! ", error);
      return next.handle(request);
      
    }
  }
}