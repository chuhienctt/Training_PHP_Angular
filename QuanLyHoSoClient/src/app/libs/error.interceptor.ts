import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { HomeService } from '../services/home.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private alert: AlertService,
    private homeService: HomeService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {

        if(localStorage.getItem("jwt")) {
          localStorage.removeItem("jwt");
          this.homeService.currentUser = null;
          this.alert.warning("Phiên đăng nhập đã hết hạn", () => {
            this.router.navigate(['/']);
          })
        }
      }
      const error = err || err.statusText;
      console.error(error);
      
      return throwError(error);
    }))
  }
}
