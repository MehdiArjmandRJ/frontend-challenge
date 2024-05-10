import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, finalize, Observable, of, takeUntil, throwError } from 'rxjs';

import { HttpLoaderService } from '../config/http-loader.service';
import { LoadingContextModel, LoadingType } from '../models/config';
import { HttpCancelService } from '../services/httpcancel.service';

export const IS_LOADING_ENABLED = new HttpContextToken<LoadingContextModel>(
  () => ({
    key: 'default',
    type: LoadingType.default,
    value: true
  })
);


@Injectable()
export class CustomAuthInterceptor implements HttpInterceptor {
  private isConnected = true;

  constructor(
    private httpLoaderService: HttpLoaderService,
    private httpCancelService: HttpCancelService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const context: LoadingContextModel = req.context.get(IS_LOADING_ENABLED);

    if (!this.isConnected) {
      // You can return an observable that completes immediately without making the request
      return of();
    }

    let token = localStorage.getItem('token');
    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    this.httpLoaderService.addLoadingListContext(context);
    return next.handle(authReq).pipe(
      takeUntil(this.httpCancelService.onCancelPendingRequests()),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
      finalize(() => {
        this.httpLoaderService.removeLoadingListContext(context);
      })
    );
  }
}
