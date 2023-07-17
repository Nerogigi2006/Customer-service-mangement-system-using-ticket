import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { StaffsService } from '../service/staffs.service';
import { SnackbarService } from '../service/snackbar.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private staff:StaffsService, private snackbarService:SnackbarService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.staff.getToken();

    if(myToken){
      request=request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}
      })
    }
   
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.snackbarService.showErrorMessage('Token has expired plase login again');
            this.router.navigate(['login'])
          }
        }
     return throwError(()=> new Error('some other error occured'))
      })
    );
  }
}
