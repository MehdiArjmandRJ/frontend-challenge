import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalErrorHandler {
  private isLoading = new BehaviorSubject<boolean>(false);
  public currentLoadingFlag = this.isLoading.asObservable();

  constructor() {
    this.changeLoadingFlag(false);
  }

  changeLoadingFlag(toggle: boolean) {
    this.isLoading.next(toggle);
  }

  handleError(reqUrl: string, error: HttpErrorResponse) {
    let errorMessage = '',
      err;

    if (error.status === 400) {
      if (typeof error.error === 'string' && JSON.parse(error.error)) {
        err = JSON.parse(error.error);
        errorMessage = this.findErrorDisplay(err?.invalidParams[0].reasons[0]);
      } else if (error.error.invalidParams) {
        err = error.error;
        errorMessage = this.findErrorDisplay(err?.invalidParams[0].reasons[0]);
      } else if (error.error.detail) {
        err = error.error;
        errorMessage = this.findErrorDisplay(err.detail);
      }
    } else if (error.status === 403) {
      errorMessage = 'دسترسی لازم وجود ندارد.';
    } else {
      errorMessage = 'خطایی رخ داده است.';
    }

    // this.notificationService.error(errorMessage, null, { comeFrom: MessageChannel.Api });
  }

  private findErrorDisplay(error: string) {
    // const findTranslate = this.errorTranslator.find(e => e.error === error)?.display;
    return 'خطایی رخ داده است.';
  }
}
