import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(
        error =>{
          switch(error.status){
            case 400:
              if(error.error.errors){
                this.toastr.error("Validation");
               // console.log(error.error.errors.Password);
                var error_array = [];
                if (error.error.errors.Password!=null){
                  error_array.push(error.error.errors.Password);
                }

                if (error.error.errors.Username!=null){
                  error_array.push(error.error.errors.Username);
                }
                
                error_array=error_array.flat();
                throw error_array;
              }
              else{
                this.toastr.error(error.statusText,error.status);
              }
              break;
            case 401:
              this.toastr.error(error.statusText,error.status);
              break;
            case 404:
              this.toastr.error(error.statusText,error.status);
              break;
            case 500:
              this.toastr.error(error.statusText,error.status);
              const navigationExtras: NavigationExtras = {state:{error:error.error}};
              this.router.navigateByUrl('/server-error',navigationExtras);
              break;
            default:
              break;
          }
        
          return throwError(error);
        }
      )
    );
  }
}
